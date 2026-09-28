import Link from "next/link";
import Logo from "./Logo";
import { site } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="border-t border-line/60">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-mute">{site.tagline} Human pace, honest talk, real work.</p>
        </div>
        <div className="text-sm">
          <p className="mb-3 text-dim">Community</p>
          <ul className="space-y-2 text-mute">
            <li><Link className="hover:text-ivory" href="/circles">Circles</Link></li>
            <li><Link className="hover:text-ivory" href="/manifesto">Manifesto</Link></li>
            <li><Link className="hover:text-ivory" href="/apply">Request invitation</Link></li>
          </ul>
        </div>
        <div className="text-sm">
          <p className="mb-3 text-dim">Read</p>
          <ul className="space-y-2 text-mute">
            <li><Link className="hover:text-ivory" href="/blog">Journal</Link></li>
            <li><Link className="hover:text-ivory" href="/#faq">FAQ</Link></li>
            <li><a className="hover:text-ivory" href={`mailto:${site.email}`}>{site.email}</a></li>
          </ul>
        </div>
      </div>
      <div className="mx-auto flex max-w-6xl flex-col justify-between gap-2 border-t border-line/60 px-5 py-6 text-xs text-dim sm:flex-row">
        <span>© {new Date().getFullYear()} {site.name}. Invite only.</span>
        <span>
          AI is not stopping. Neither are we — at a human pace. · Photos via{" "}
          <a href="https://unsplash.com" className="hover:text-mute">Unsplash</a>
        </span>
      </div>
    </footer>
  );
}
