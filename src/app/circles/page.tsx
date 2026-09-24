import type { Metadata } from "next";
import Link from "next/link";
import { circles } from "@/lib/site";
import Eyebrow from "@/components/Eyebrow";

export const metadata: Metadata = {
  title: "Circles — access levels for AI founders, engineers, operators and job seekers",
  description:
    "TopAImate members share one Commons and unlock private circles for AI Founders, AI Engineers, AI Managers, AI Marketers & SDRs, AI Hiring and AI Job Seekers. Here's who each is for and how to get in.",
  alternates: { canonical: "/circles" },
};

export default function CirclesPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-20">
      <div className="max-w-3xl">
        <Eyebrow>Circles & access</Eyebrow>
        <h1 className="font-serif text-5xl leading-tight md:text-6xl">
          Everyone shares the Commons. <span className="italic text-brass">Circles are earned.</span>
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-mute">
          Each circle has its own rooms, sessions, projects and opportunities. You unlock a circle when you meet its bar —
          and you can belong to more than one. A founder who is hiring sits in two. An engineer looking for their next
          role can sit in two.
        </p>
      </div>

      {/* Commons */}
      <div className="mt-14 rounded-3xl border border-brass/30 bg-gradient-to-br from-brass/10 to-transparent p-8 md:p-10">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <div>
            <p className="text-xs uppercase tracking-widest text-brass">Level 0 · every member</p>
            <h2 className="mt-2 font-serif text-4xl">The Commons</h2>
            <p className="mt-3 max-w-2xl text-mute">
              The shared floor: weekly open conversations on where AI is heading, the monthly &ldquo;fear &amp; possibility&rdquo;
              roundtable, the member directory and the public project board.
            </p>
          </div>
          <Link href="/apply" className="shrink-0 rounded-full bg-ivory px-6 py-3 text-sm font-medium text-ink hover:bg-brass-2">
            Request invitation
          </Link>
        </div>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {circles.map((c, i) => (
          <section key={c.slug} id={c.slug} className="scroll-mt-24 rounded-3xl border border-line bg-ink-2/60 p-8">
            <div className="flex items-center justify-between">
              <span className="font-serif text-xl italic text-dim">Circle 0{i + 1}</span>
              <span className="rounded-full border border-line px-3 py-1 text-xs text-mute">Gated</span>
            </div>
            <h2 className="mt-5 font-serif text-3xl">{c.name}</h2>
            <p className="mt-2 text-mute">{c.who}</p>
            <ul className="mt-6 space-y-2.5 text-sm">
              {c.inside.map((x) => (
                <li key={x} className="flex gap-3">
                  <span className="text-brass">✦</span>
                  <span className="text-ivory/90">{x}</span>
                </li>
              ))}
            </ul>
            <div className="mt-7 rounded-xl border border-line bg-ink p-4 text-sm">
              <span className="text-dim">To unlock: </span>
              <span className="text-ivory">{c.access}</span>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
