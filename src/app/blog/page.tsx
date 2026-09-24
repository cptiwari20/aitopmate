import type { Metadata } from "next";
import Link from "next/link";
import { getPosts, formatDate } from "@/lib/posts";
import Eyebrow from "@/components/Eyebrow";

export const metadata: Metadata = {
  title: "Journal — honest writing on AI, work and the people building it",
  description:
    "Essays from the TopAImate community on AI careers, AI job anxiety, finding co-founders, hiring for AI roles and what AI still can't do.",
  alternates: { canonical: "/blog" },
};

export default function BlogIndex() {
  const [lead, ...rest] = getPosts();
  return (
    <div className="mx-auto max-w-6xl px-5 py-20">
      <Eyebrow>The Journal</Eyebrow>
      <h1 className="max-w-3xl font-serif text-5xl leading-tight md:text-6xl">
        Notes on building with AI — <span className="italic text-brass">and staying human</span> while we do.
      </h1>

      {lead && (
        <Link href={`/blog/${lead.slug}`} className="group mt-14 block rounded-3xl border border-line bg-ink-2/60 p-8 transition hover:border-mute/50 md:p-12">
          <span className="text-xs uppercase tracking-widest text-brass">Latest · {lead.tag}</span>
          <h2 className="mt-4 max-w-3xl font-serif text-4xl leading-tight group-hover:text-brass-2 md:text-5xl">{lead.title}</h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-mute">{lead.description}</p>
          <p className="mt-8 text-sm text-dim">
            {formatDate(lead.date)} · {lead.readingMinutes} min read
          </p>
        </Link>
      )}

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {rest.map((p) => (
          <Link key={p.slug} href={`/blog/${p.slug}`} className="group rounded-3xl border border-line bg-ink-2/40 p-8 transition hover:border-mute/50">
            <span className="text-xs uppercase tracking-widest text-brass">{p.tag}</span>
            <h2 className="mt-3 font-serif text-3xl leading-snug group-hover:text-brass-2">{p.title}</h2>
            <p className="mt-3 leading-relaxed text-mute">{p.description}</p>
            <p className="mt-6 text-sm text-dim">
              {formatDate(p.date)} · {p.readingMinutes} min read
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
