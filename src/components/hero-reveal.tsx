"use client";

import { useEffect, useState } from "react";

export function HeroReveal({ children }: { children: React.ReactNode }) {
  const [shown, setShown] = useState(false);
  useEffect(() => setShown(true), []);
  return <div className={`t-stagger ${shown ? "is-shown" : ""}`}>{children}</div>;
}
