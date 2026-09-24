import Link from "next/link";
import { site, circles, inside, faqs } from "@/lib/site";
import { getPosts, formatDate } from "@/lib/posts";
import SeatMeter from "@/components/SeatMeter";
import Eyebrow from "@/components/Eyebrow";
import JsonLd from "@/components/JsonLd";

const possible = [
  "Which workflows are finally ready for agents — and which still need a person?",
  "What can a team of three ship now that needed thirty in 2022?",
  "Where are the boring, unglamorous AI businesses nobody is building yet?",
  "How do we price products when the cost of intelligence keeps falling?",
];

const afraid = [
  "If an agent can do my job's first draft, what exactly am I paid for?",
  "Are we training juniors, or quietly removing the rungs of the ladder?",
  "What happens to trust when anything can be generated?",
  "How do I keep up without burning out trying to keep up?",
];

const steps = [
  { n: "01", t: "Apply", d: "Tell us what you're building and what worries you. Ten minutes, no CV required." },
  { n: "02", t: "Human review", d: `A member of the founding team reads every application. Answers within ${site.cohort.reviewDays}.` },
  { n: "03", t: "Welcome call", d: "Some applicants get a short call. It's a conversation, not an interview." },
  { n: "04", t: "The Commons", d: "You join the shared space, meet your cohort and unlock the circles you qualify for." },
];

export default function Home() {
  const posts = getPosts().slice(0, 3);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            { "@type": "Organization", name: site.name, url: site.url, description: site.description },
            { "@type": "WebSite", name: site.name, url: site.url },
            {
              "@type": "FAQPage",
              mainEntity: faqs.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
              })),
            },
          ],
        }}
      />

      {/* HERO */}
      <section className="glow relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-5 pb-24 pt-20 md:pt-28">
          <div className="fade-up mx-auto max-w-3xl text-center">
            <p className="mx-auto mb-8 inline-flex items-center gap-2 rounded-full border border-line bg-ink-2/80 px-4 py-1.5 text-xs text-mute">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-ember" />
              Invite only · {site.cohort.name} closes {site.cohort.closes}
            </p>
            <h1 className="text-gradient font-serif text-5xl leading-[1.02] tracking-tight sm:text-6xl md:text-7xl">
              The room where AI&apos;s builders
              <span className="italic text-brass"> talk honestly.</span>
            </h1>
            <p className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-mute">
              A private community for AI founders, engineers, operators, marketers, recruiters and the people
              moving into AI — to figure out what we can build, and to be honest about what we&apos;re afraid of losing.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/apply"
                className="w-full rounded-full bg-ivory px-7 py-3.5 text-sm font-medium text-ink transition hover:bg-brass-2 sm:w-auto"
              >
                Request an invitation →
              </Link>
              <Link
                href="/manifesto"
                className="w-full rounded-full border border-line px-7 py-3.5 text-sm text-ivory transition hover:border-mute sm:w-auto"
              >
                Read the manifesto
              </Link>
            </div>
          </div>

          <div className="fade-up mx-auto mt-16 grid max-w-4xl gap-4 [animation-delay:150ms] md:grid-cols-[1fr_1fr_1.3fr]">
            <Stat k="Every" v="application read by a human" />
            <Stat k="≤ 12" v="people per private room" />
            <SeatMeter />
          </div>
        </div>
      </section>

      {/* TWO CONVERSATIONS */}
      <section className="mx-auto max-w-6xl px-5 py-24">
        <div className="max-w-2xl">
          <Eyebrow>Two conversations, one room</Eyebrow>
          <h2 className="font-serif text-4xl leading-tight md:text-5xl">
            Most AI communities only talk about the upside. We talk about both.
          </h2>
          <p className="mt-5 text-mute">
            Real questions from this month&apos;s rooms. Nobody here is pretending to have it figured out.
          </p>
        </div>
        <div className="mt-14 grid gap-5 md:grid-cols-2">
          <QuestionCard title="What we can build" accent="text-brass" items={possible} />
          <QuestionCard title="What we're afraid of" accent="text-ember" items={afraid} />
        </div>
      </section>

      <div className="hairline mx-auto max-w-6xl" />

      {/* CIRCLES */}
      <section className="mx-auto max-w-6xl px-5 py-24">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <Eyebrow>Circles</Eyebrow>
            <h2 className="font-serif text-4xl leading-tight md:text-5xl">
              One Commons. Six private circles you have to earn.
            </h2>
          </div>
          <Link href="/circles" className="text-sm text-brass hover:text-brass-2">
            See access requirements →
          </Link>
        </div>
        <div className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {circles.map((c, i) => (
            <div key={c.slug} className="group bg-ink-2 p-7 transition hover:bg-ink-3">
              <div className="flex items-center justify-between">
                <span className="font-serif text-lg italic text-dim">0{i + 1}</span>
                <span className="rounded-full border border-line px-2.5 py-0.5 text-[11px] text-dim group-hover:border-brass/50 group-hover:text-brass">
                  Gated
                </span>
              </div>
              <h3 className="mt-6 text-xl font-medium">{c.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-mute">{c.who}</p>
            </div>
          ))}
        </div>
      </section>

      {/* INSIDE */}
      <section className="border-y border-line/60 bg-ink-2/50">
        <div className="mx-auto max-w-6xl px-5 py-24">
          <div className="max-w-2xl">
            <Eyebrow>What&apos;s inside</Eyebrow>
            <h2 className="font-serif text-4xl leading-tight md:text-5xl">
              Less feed. More rooms, work and real opportunities.
            </h2>
          </div>
          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {inside.map((x) => (
              <div key={x.title} className="rounded-2xl border border-line bg-ink p-6">
                <h3 className="font-serif text-2xl">{x.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-mute">{x.body}</p>
              </div>
            ))}
          </div>

          {/* Mock preview of a room */}
          <div className="mt-10 overflow-hidden rounded-3xl border border-line bg-ink">
            <div className="flex items-center gap-2 border-b border-line px-5 py-3 text-xs text-dim">
              <span className="h-2 w-2 rounded-full bg-line" />
              <span className="h-2 w-2 rounded-full bg-line" />
              <span className="h-2 w-2 rounded-full bg-line" />
              <span className="ml-3"># founders · pricing-when-tokens-get-cheap</span>
            </div>
            <div className="space-y-5 p-6 text-sm">
              <Msg who="Founder, B2B agents" role="Founders" text="We dropped per-seat pricing last month. Outcome-based is scarier to forecast but customers finally stopped asking 'how many humans does this replace?'" />
              <Msg who="Head of Ops, fintech" role="Operators" text="From the buyer side: that question is the whole politics of the deal. If your pricing makes my team look redundant, legal and HR get involved and it dies." />
              <Msg who="Applied AI engineer" role="Engineers" text="Happy to share our eval harness — it's how we proved the 'outcome' part to procurement without hand-waving." />
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="mx-auto max-w-6xl px-5 py-24">
        <div className="max-w-2xl">
          <Eyebrow>How invitations work</Eyebrow>
          <h2 className="font-serif text-4xl leading-tight md:text-5xl">Deliberately slow. Deliberately small.</h2>
        </div>
        <ol className="mt-14 grid gap-8 md:grid-cols-4">
          {steps.map((s) => (
            <li key={s.n} className="border-t border-line pt-6">
              <span className="font-serif text-3xl italic text-brass">{s.n}</span>
              <h3 className="mt-3 text-lg font-medium">{s.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-mute">{s.d}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* MANIFESTO QUOTE */}
      <section className="border-y border-line/60">
        <div className="mx-auto max-w-4xl px-5 py-24 text-center">
          <p className="font-serif text-3xl leading-snug md:text-5xl">
            &ldquo;AI is not stopping. Neither are we. But we are human —
            <span className="italic text-brass"> we don&apos;t have to outpace ourselves</span> to stay relevant.&rdquo;
          </p>
          <Link href="/manifesto" className="mt-8 inline-block text-sm text-mute hover:text-ivory">
            Read the full manifesto →
          </Link>
        </div>
      </section>

      {/* JOURNAL */}
      <section className="mx-auto max-w-6xl px-5 py-24">
        <div className="flex items-end justify-between gap-6">
          <div>
            <Eyebrow>From the Journal</Eyebrow>
            <h2 className="font-serif text-4xl md:text-5xl">Notes from inside the room</h2>
          </div>
          <Link href="/blog" className="hidden text-sm text-brass hover:text-brass-2 sm:block">
            All essays →
          </Link>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {posts.map((p) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}`}
              className="group flex flex-col rounded-2xl border border-line bg-ink-2/60 p-6 transition hover:border-mute/50"
            >
              <span className="text-xs uppercase tracking-widest text-brass">{p.tag}</span>
              <h3 className="mt-4 font-serif text-2xl leading-snug group-hover:text-brass-2">{p.title}</h3>
              <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-mute">{p.description}</p>
              <span className="mt-auto pt-6 text-xs text-dim">
                {formatDate(p.date)} · {p.readingMinutes} min read
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-3xl scroll-mt-24 px-5 pb-24">
        <Eyebrow>FAQ</Eyebrow>
        <h2 className="font-serif text-4xl md:text-5xl">Questions, answered plainly</h2>
        <div className="mt-10 divide-y divide-line border-y border-line">
          {faqs.map((f) => (
            <details key={f.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg">
                {f.q}
                <span className="text-brass transition group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 leading-relaxed text-mute">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="glow border-t border-line/60">
        <div className="mx-auto max-w-3xl px-5 py-24 text-center">
          <h2 className="font-serif text-4xl leading-tight md:text-6xl">
            If you&apos;re building the AI era,
            <br />
            <span className="italic text-brass">there&apos;s a seat for you.</span> For now.
          </h2>
          <div className="mx-auto mt-10 max-w-sm">
            <SeatMeter compact />
          </div>
          <Link
            href="/apply"
            className="mt-10 inline-block rounded-full bg-ivory px-8 py-4 text-sm font-medium text-ink transition hover:bg-brass-2"
          >
            Request your invitation →
          </Link>
        </div>
      </section>
    </>
  );
}

function Stat({ k, v }: { k: string; v: string }) {
  return (
    <div className="rounded-2xl border border-line bg-ink-2/70 p-5">
      <p className="font-serif text-3xl text-ivory">{k}</p>
      <p className="mt-1 text-sm text-mute">{v}</p>
    </div>
  );
}

function QuestionCard({ title, accent, items }: { title: string; accent: string; items: string[] }) {
  return (
    <div className="rounded-3xl border border-line bg-ink-2/60 p-8">
      <h3 className={`font-serif text-3xl italic ${accent}`}>{title}</h3>
      <ul className="mt-6 space-y-4">
        {items.map((q) => (
          <li key={q} className="flex gap-3 border-t border-line pt-4 leading-relaxed text-ivory/90">
            <span className={`${accent} mt-0.5`}>→</span>
            {q}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Msg({ who, role, text }: { who: string; role: string; text: string }) {
  return (
    <div className="flex gap-3">
      <div className="h-8 w-8 shrink-0 rounded-full border border-line bg-ink-3" />
      <div>
        <p className="text-xs text-dim">
          <span className="text-ivory">{who}</span> · {role} circle
        </p>
        <p className="mt-1 leading-relaxed text-mute">{text}</p>
      </div>
    </div>
  );
}
