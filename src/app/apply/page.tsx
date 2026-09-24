import type { Metadata } from "next";
import ApplyForm from "@/components/ApplyForm";
import SeatMeter from "@/components/SeatMeter";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Request an invitation",
  description: `Apply to join ${site.name}, the invite-only community for people building the AI era. Every application is read by a human.`,
  alternates: { canonical: "/apply" },
};

const notes = [
  ["Read by a person", "No automated scoring. A member of the founding team reads every application."],
  ["Small on purpose", `${site.cohort.seatsTotal} seats per cohort. When they're gone, applications roll to the next one.`],
  ["Honesty over polish", "We don't need a perfect CV. We need to know what you're building and what you think."],
];

export default function ApplyPage() {
  return (
    <div className="glow">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:py-20 lg:grid-cols-[1fr_1.55fr]">
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <p className="text-xs uppercase tracking-[0.2em] text-brass">Invitation request · {site.cohort.name}</p>
          <h1 className="mt-4 font-serif text-5xl leading-[1.05] md:text-6xl">
            A seat at the table <span className="italic text-brass">is earned.</span>
          </h1>
          <p className="mt-5 leading-relaxed text-mute">
            About ten minutes. Answer the way you&apos;d talk to a peer, not a recruiter.
          </p>
          <div className="mt-8">
            <SeatMeter />
          </div>
          <ul className="mt-8 space-y-5">
            {notes.map(([t, d]) => (
              <li key={t} className="flex gap-3">
                <span className="mt-1 text-brass">✦</span>
                <div>
                  <p className="text-sm font-medium">{t}</p>
                  <p className="mt-0.5 text-sm leading-relaxed text-mute">{d}</p>
                </div>
              </li>
            ))}
          </ul>
        </aside>
        <ApplyForm />
      </div>
    </div>
  );
}
