# Ask conversation record: setup

The assistant writes each question and answer to Supabase so Atharva can see how
it behaves and what people actually ask. It is off until the two environment
variables exist, and the assistant works normally without them, so nothing here
blocks a deploy.

## Why the answer is stored too

The record exists to catch the assistant getting something wrong about Atharva.
It has already been caught once inventing provenance for the Field Maintenance
savings figures, phrasing that was not in the corpus. Questions alone would not
have shown that. The answer is the part worth auditing.

## What is not stored

No IP address, no user agent, no cookie, no identifier of any kind. The only
key is a `conversation_id` the browser generates to keep one thread together,
which is replaced whenever the visitor presses Start over. The rate limiter
hashes IPs in memory and never writes them anywhere, and that separation is
deliberate: nothing in the record links a conversation to a person except what
the visitor chose to type.

Visitors are told, in the line under the composer, that questions and answers
are kept for 90 days.

## 1. Create the table

In the Supabase SQL editor:

```sql
create table public.ask_log (
  id              bigint generated always as identity primary key,
  conversation_id text        not null,
  question        text        not null,
  answer          text        not null,
  page_path       text,
  finish_reason   text,
  truncated       boolean     not null default false,
  created_at      timestamptz not null default now()
);

create index ask_log_created_at_idx on public.ask_log (created_at desc);
create index ask_log_conversation_idx on public.ask_log (conversation_id, created_at);

-- No policies are defined on purpose. RLS on with zero policies means the anon
-- and authenticated keys can read nothing, and only the service role key, which
-- lives server-side, can write. If this table is ever read from the browser,
-- add a policy deliberately rather than leaving it open.
alter table public.ask_log enable row level security;
```

## 2. Set the retention job

The UI promises 90 days, so something has to enforce it. In the SQL editor:

```sql
create extension if not exists pg_cron;

select cron.schedule(
  'ask_log_retention',
  '17 3 * * *',
  $$delete from public.ask_log where created_at < now() - interval '90 days'$$
);
```

If pg_cron is unavailable on the plan, run the delete by hand periodically, or
move it to a Vercel cron route. What matters is that the promise in the UI is
kept.

## 3. Add the environment variables

Both are server-only. Neither may be prefixed `NEXT_PUBLIC_`, because the
service role key bypasses row level security and must never reach a browser.

```
SUPABASE_URL=https://<project-ref>.supabase.co
SUPABASE_SERVICE_ROLE_KEY=<service role key, Project Settings > API>
```

Add them to `.env.local` for local work, and in Vercel scoped to **Production
only**, so preview deployments do not write test conversations into the real
record.

## 4. Reading it

```sql
-- What people ask, most recent first
select created_at, page_path, question, answer
from public.ask_log
order by created_at desc
limit 50;

-- Whole threads, in order
select turn.created_at, turn.question, turn.answer
from public.ask_log turn
where turn.conversation_id = '<id>'
order by turn.created_at;

-- Answers that cite a number, which is where invention is most costly
select created_at, question, answer
from public.ask_log
where answer ~ '[0-9]+\s*(%|percent)'
order by created_at desc;

-- Answers that were cut off
select created_at, question from public.ask_log where truncated;

-- Which pages the panel gets opened from
select coalesce(page_path, 'direct /ask') as page, count(*)
from public.ask_log
group by 1 order by 2 desc;
```

The third query is the one worth running regularly. Every number the assistant
states about Atharva's work should be traceable to the corpus, and that is the
check the record exists to make possible.
