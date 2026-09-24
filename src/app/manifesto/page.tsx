import type { Metadata } from "next";
import Link from "next/link";
import Eyebrow from "@/components/Eyebrow";

export const metadata: Metadata = {
  title: "Manifesto — AI at a human pace",
  description:
    "Why TopAImate exists: an honest, invite-only community for people building with AI who want to talk about both the possibilities and the fear.",
  alternates: { canonical: "/manifesto" },
};

const principles = [
  ["Both sides, always.", "Every conversation about what AI can do earns a conversation about what it costs. Optimism without honesty is marketing."],
  ["Humans set the pace.", "AI is not stopping, and we don't pretend it will. But we don't measure people against machines. We measure progress by people who are better off."],
  ["Real names, small rooms.", "No anonymous hot takes, no 40,000-person channels. Rooms stay small so people can say the true thing."],
  ["Off the record by default.", "What's said inside stays inside unless the person says otherwise. That's what makes the fear conversations possible."],
  ["Give before you ask.", "No pitching in rooms. Share a lesson, a review, an intro — then ask for what you need."],
  ["Ship something.", "Talk is the start, not the goal. Every cohort ends with members' projects shown to the whole community."],
];

export default function ManifestoPage() {
  return (
    <article className="mx-auto max-w-3xl px-5 py-20">
      <Eyebrow>Manifesto</Eyebrow>
      <h1 className="font-serif text-5xl leading-[1.05] md:text-7xl">
        AI at a <span className="italic text-brass">human</span> pace.
      </h1>
      <div className="prose-journal mt-10">
        <p>
          Every week another launch promises to replace a job, a team, a whole industry. Every week, somewhere, a very capable
          person quietly wonders whether they&apos;re next. Both of those things are true at the same time — and almost nobody
          talks about them in the same room.
        </p>
        <p>
          TopAImate is that room. We&apos;re founders, engineers, managers, marketers, SDRs, recruiters and people trying to get
          their first AI role. We&apos;re here to figure out what to build. We&apos;re also here to be honest about what we&apos;re
          afraid of losing: craft, careers, trust, the junior rungs of the ladder, our own attention.
        </p>
        <blockquote>We can&apos;t out-compute the machines. We don&apos;t have to. We have to out-think, out-care and out-collaborate.</blockquote>
        <p>
          We keep it invite-only not to feel exclusive, but because honesty doesn&apos;t scale in a public feed. Trust takes small
          rooms, real names and people who have something at stake.
        </p>
      </div>

      <h2 className="mt-16 font-serif text-4xl">House rules</h2>
      <ol className="mt-8 space-y-px overflow-hidden rounded-3xl border border-line bg-line">
        {principles.map(([t, d], i) => (
          <li key={t} className="flex gap-6 bg-ink-2 p-6">
            <span className="font-serif text-2xl italic text-brass">{i + 1}</span>
            <div>
              <h3 className="text-lg font-medium">{t}</h3>
              <p className="mt-1 leading-relaxed text-mute">{d}</p>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-16 text-center">
        <Link href="/apply" className="inline-block rounded-full bg-ivory px-8 py-4 text-sm font-medium text-ink hover:bg-brass-2">
          If this sounds like you — request an invitation
        </Link>
      </div>
    </article>
  );
}
