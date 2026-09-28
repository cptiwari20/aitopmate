import Link from "next/link";
import { site, circles, inside, faqs, indiaRooms, indiaFormingCities } from "@/lib/site";
import { getPosts, formatDate } from "@/lib/posts";
import SeatMeter from "@/components/SeatMeter";
import Eyebrow from "@/components/Eyebrow";
import JsonLd from "@/components/JsonLd";
import Photo from "@/components/Photo";
import FaceStack from "@/components/FaceStack";
import { scenes, faces, people, india } from "@/lib/photos";

const mosaic = [
  { ...scenes.dinner, label: "Founder dinners", span: "md:col-span-2 md:row-span-2" },
  { ...scenes.laughing, label: "Off-the-record nights", span: "" },
  { ...scenes.builders, label: "Build squads", span: "" },
  { ...india.boardroom, label: "India founder rooms", span: "" },
  { ...scenes.whiteboard, label: "Working sessions", span: "" },
];

const insidePhotos = [scenes.cafe, scenes.lounge, scenes.whiteboard, scenes.builders];

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
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <FaceStack count={7} />
              <p className="text-sm text-mute sm:text-left">
                Founders, engineers, operators and career-changers.
                <br className="hidden sm:block" />
                <span className="text-dim"> Real names, reviewed one by one.</span>
              </p>
            </div>
          </div>

          <div className="fade-up mx-auto mt-16 grid max-w-4xl gap-4 [animation-delay:150ms] md:grid-cols-[1fr_1fr_1.3fr]">
            <Stat k="Every" v="application read by a human" />
            <Stat k="≤ 12" v="people per private room" />
            <SeatMeter />
          </div>

          <div className="fade-up mt-16 grid auto-rows-[180px] grid-cols-2 gap-3 [animation-delay:300ms] md:auto-rows-[210px] md:grid-cols-4">
            {mosaic.map((m, i) => (
              <figure key={m.label} className={`group relative overflow-hidden rounded-2xl border border-line ${m.span} ${i === 0 ? "col-span-2 row-span-2" : ""}`}>
                <Photo
                  src={m.src}
                  alt={m.alt}
                  sizes={i === 0 ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 768px) 25vw, 50vw"}
                  preload={i === 0}
                  className="h-full w-full transition duration-700 group-hover:scale-[1.03]"
                />
                <figcaption className="absolute bottom-3 left-4 text-sm text-ivory/90">
                  {i === 0 ? <span className="font-serif text-2xl italic">{m.label}</span> : m.label}
                </figcaption>
              </figure>
            ))}
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

      {/* WHO YOU'LL MEET */}
      <section className="border-y border-line/60 bg-ink-2/40">
        <div className="mx-auto max-w-6xl px-5 py-24">
          <div className="max-w-2xl">
            <Eyebrow>Who you&apos;ll meet</Eyebrow>
            <h2 className="font-serif text-4xl leading-tight md:text-5xl">
              People, not profiles. <span className="italic text-brass">Everyone brings a question.</span>
            </h2>
            <p className="mt-5 text-mute">The kinds of people this room is built for — and what keeps them up at night.</p>
          </div>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {people.map((p) => (
              <figure key={p.role} className="group overflow-hidden rounded-3xl border border-line bg-ink">
                <Photo
                  src={`${p.face}?w=800&h=640&fit=crop&crop=faces`}
                  alt={`Portrait representing ${p.role.toLowerCase()}`}
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="aspect-[5/4] w-full transition duration-700 group-hover:scale-[1.02]"
                />
                <figcaption className="-mt-10 relative px-6 pb-7">
                  <p className="text-xs uppercase tracking-[0.2em] text-brass">{p.role}</p>
                  <blockquote className="mt-3 font-serif text-2xl leading-snug text-ivory">&ldquo;{p.line}&rdquo;</blockquote>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* INDIA ROOMS */}
      <section id="india" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-24">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_1fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <Eyebrow>India Rooms · IST</Eyebrow>
            <h2 className="font-serif text-4xl leading-tight md:text-5xl">
              Building from Indore, Jabalpur, Bangalore and Pune.{" "}
              <span className="italic text-brass">Not just San Francisco.</span>
            </h2>
            <p className="mt-5 leading-relaxed text-mute">
              You don&apos;t have to move to Bangalore to build AI. Some of India&apos;s most determined builders are in
              Indore, Jabalpur and cities most of the startup world never looks at — and that&apos;s where the fear about
              AI and jobs is felt most directly too. So we run small in-person founder rooms city by city, plus weekly
              sessions on IST. In English, and in Hinglish when the conversation wants it.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-3">
              <figure className="relative col-span-2 overflow-hidden rounded-2xl border border-line">
                <Photo src={india.boardroom.src} alt={india.boardroom.alt} sizes="(min-width: 1024px) 40vw, 100vw" className="aspect-[16/9] w-full" />
                <figcaption className="absolute bottom-3 left-4 font-serif text-xl italic">India founder sessions</figcaption>
              </figure>
              <figure className="relative overflow-hidden rounded-2xl border border-line">
                <Photo src={india.oneOnOne.src} alt={india.oneOnOne.alt} sizes="(min-width: 1024px) 20vw, 50vw" className="aspect-square w-full" />
                <figcaption className="absolute bottom-3 left-4 text-sm">Founder 1:1s</figcaption>
              </figure>
              <figure className="relative overflow-hidden rounded-2xl border border-line">
                <Photo src={india.team.src} alt={india.team.alt} sizes="(min-width: 1024px) 20vw, 50vw" className="aspect-square w-full" />
                <figcaption className="absolute bottom-3 left-4 text-sm">Build nights</figcaption>
              </figure>
            </div>
          </div>

          <ul className="divide-y divide-line overflow-hidden rounded-3xl border border-line bg-ink-2/60">
            {indiaRooms.map((r) => (
              <li key={r.city + r.name} className="p-6 transition hover:bg-ink-3 md:p-7">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="text-xs uppercase tracking-[0.2em] text-brass">{r.city}</p>
                  <p className="text-xs text-dim">{r.when}</p>
                </div>
                <h3 className="mt-2 font-serif text-2xl">{r.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-mute">{r.topic}</p>
              </li>
            ))}
            <li className="p-6 md:p-7">
              <p className="text-xs uppercase tracking-[0.2em] text-dim">Forming next</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {indiaFormingCities.map((c) => (
                  <span key={c} className="rounded-full border border-line px-3 py-1 text-xs text-mute">
                    {c}
                  </span>
                ))}
                <span className="rounded-full border border-dashed border-brass/50 px-3 py-1 text-xs text-brass">Your city?</span>
              </div>
            </li>
            <li className="flex flex-col items-start justify-between gap-4 bg-brass/5 p-6 sm:flex-row sm:items-center md:p-7">
              <p className="text-sm text-mute">
                A new room opens when enough members in a city ask for one.{" "}
                <span className="text-ivory">Put your city on your application.</span>
              </p>
              <Link href="/apply" className="shrink-0 rounded-full bg-ivory px-5 py-2.5 text-sm font-medium text-ink hover:bg-brass-2">
                Apply →
              </Link>
            </li>
          </ul>
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
            {inside.map((x, i) => (
              <div key={x.title} className="overflow-hidden rounded-2xl border border-line bg-ink">
                <Photo
                  src={insidePhotos[i].src}
                  alt={insidePhotos[i].alt}
                  sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
                  className="aspect-[4/3] w-full"
                />
                <div className="p-6 pt-4">
                  <h3 className="font-serif text-2xl">{x.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-mute">{x.body}</p>
                </div>
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
              <Msg face={faces[6]} who="Founder, B2B agents" role="Founders" text="We dropped per-seat pricing last month. Outcome-based is scarier to forecast but customers finally stopped asking 'how many humans does this replace?'" />
              <Msg face={faces[7]} who="Head of Ops, fintech" role="Operators" text="From the buyer side: that question is the whole politics of the deal. If your pricing makes my team look redundant, legal and HR get involved and it dies." />
              <Msg face={faces[9]} who="Applied AI engineer" role="Engineers" text="Happy to share our eval harness — it's how we proved the 'outcome' part to procurement without hand-waving." />
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
      <section className="relative overflow-hidden border-t border-line/60">
        <Photo src={scenes.longTable.src} alt={scenes.longTable.alt} sizes="100vw" overlay={false} className="absolute inset-0" />
        <div className="absolute inset-0 bg-ink/65" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/20 to-ink" />
        <div className="relative mx-auto max-w-3xl px-5 py-32 text-center">
          <h2 className="font-serif text-4xl leading-tight md:text-6xl">
            If you&apos;re building the AI era,
            <br />
            <span className="italic text-brass">there&apos;s a seat for you.</span> For now.
          </h2>
          <div className="mx-auto mt-10 max-w-sm text-left backdrop-blur-md">
            <SeatMeter />
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

function Msg({ face, who, role, text }: { face: string; who: string; role: string; text: string }) {
  return (
    <div className="flex gap-3">
      <Photo src={`${face}?w=96&h=96&fit=crop&crop=faces`} alt="" sizes="36px" overlay={false} className="h-9 w-9 shrink-0 rounded-full border border-line" />
      <div>
        <p className="text-xs text-dim">
          <span className="text-ivory">{who}</span> · {role} circle
        </p>
        <p className="mt-1 leading-relaxed text-mute">{text}</p>
      </div>
    </div>
  );
}
