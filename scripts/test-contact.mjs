import assert from 'node:assert/strict';
import { POST } from '../src/app/api/contact/route.ts';
const valid = { name: 'Test visitor', email: 'visitor@example.com', context: 'Collaboration', message: 'A test message about a potential project.', website: '' };
const request = (body = valid, origin = 'http://localhost:3009', ip = 'test') => new Request('http://localhost:3009/api/contact', {
  method: 'POST', headers: { origin, 'content-type': 'application/json', 'x-forwarded-for': ip }, body: JSON.stringify(body),
});
const originalFetch = globalThis.fetch;
const originalKey = process.env.RESEND_API_KEY;
const originalFrom = process.env.CONTACT_FROM_EMAIL;
try {
  let calls = 0;
  globalThis.fetch = async () => { calls++; throw new Error('Unexpected external request'); };
  assert.equal((await POST(request(valid, 'https://other.example'))).status, 403);
  assert.equal((await POST(request({ ...valid, email: 'invalid' }))).status, 400);
  assert.equal((await POST(request({ ...valid, website: 'spam' }))).status, 400);
  assert.equal((await POST(request({ ...valid, message: 'x'.repeat(17000) }))).status, 413);
  delete process.env.RESEND_API_KEY;
  delete process.env.CONTACT_FROM_EMAIL;
  assert.equal((await POST(request())).status, 503);
  assert.equal(calls, 0);
  process.env.RESEND_API_KEY = 'test-only';
  process.env.CONTACT_FROM_EMAIL = 'Portfolio <test@example.com>';
  let key;
  globalThis.fetch = async (url, options) => {
    assert.equal(url, 'https://api.resend.com/emails');
    const body = JSON.parse(options.body);
    assert.equal(body.reply_to, valid.email);
    assert.deepEqual(body.to, [process.env.CONTACT_TO_EMAIL || 'atharvapatil128@gmail.com']);
    if (key) assert.equal(options.headers['Idempotency-Key'], key);
    key = options.headers['Idempotency-Key'];
    return Response.json({ id: 'mock-provider-id' });
  };
  assert.deepEqual(await (await POST(request())).json(), { ok: true });
  assert.equal((await POST(request())).status, 200);
  globalThis.fetch = async () => Response.json({ error: 'Rejected' }, { status: 500 });
  assert.equal((await POST(request(valid, undefined, 'failure'))).status, 502);
  globalThis.fetch = async () => { throw new Error('Network failure'); };
  assert.equal((await POST(request(valid, undefined, 'network'))).status, 502);
  globalThis.fetch = async () => Response.json({ id: 'mock-provider-id' });
  for (let i = 0; i < 5; i++) assert.equal((await POST(request(valid, undefined, 'rate-limit'))).status, 200);
  assert.equal((await POST(request(valid, undefined, 'rate-limit'))).status, 429);
  console.log('Contact checks passed: validation, configuration, delivery payload, duplicate key, provider errors, rate limit. No email sent.');
} finally {
  globalThis.fetch = originalFetch;
  if (originalKey === undefined) delete process.env.RESEND_API_KEY; else process.env.RESEND_API_KEY = originalKey;
  if (originalFrom === undefined) delete process.env.CONTACT_FROM_EMAIL; else process.env.CONTACT_FROM_EMAIL = originalFrom;
}
