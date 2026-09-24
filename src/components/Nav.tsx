"use client";

import Link from "next/link";
import { useState } from "react";
import Logo from "./Logo";

const links = [
  { href: "/circles", label: "Circles" },
  { href: "/manifesto", label: "Manifesto" },
  { href: "/blog", label: "Journal" },
  { href: "/#faq", label: "FAQ" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-line/60 bg-ink/75 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Logo />
        <nav className="hidden items-center gap-8 text-sm text-mute md:flex">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="transition hover:text-ivory">
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link
            href="/apply"
            className="rounded-full bg-ivory px-4 py-2 text-sm font-medium text-ink transition hover:bg-brass-2"
          >
            Request invitation
          </Link>
          <button
            onClick={() => setOpen(!open)}
            className="grid h-9 w-9 place-items-center rounded-full border border-line md:hidden"
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <span className="block h-px w-4 bg-ivory shadow-[0_5px_0_var(--color-ivory),0_-5px_0_var(--color-ivory)]" />
          </button>
        </div>
      </div>
      {open && (
        <nav className="border-t border-line/60 px-5 py-4 md:hidden">
          {links.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="block py-2.5 text-mute">
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
