import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPost, getPosts, formatDate } from "@/lib/posts";
import { site } from "@/lib/site";
import JsonLd from "@/components/JsonLd";

export const dynamicParams = false;

export function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      authors: [post.author],
    },
    twitter: { card: "summary_large_image", title: post.title, description: post.description },
  };
}

export default async function PostPage(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  const post = getPost(slug);
  if (!post) notFound();
  const more = getPosts().filter((p) => p.slug !== slug).slice(0, 2);

  return (
    <article className="mx-auto max-w-3xl px-5 py-16 md:py-20">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.description,
          datePublished: post.date,
          author: { "@type": "Organization", name: post.author },
          publisher: { "@type": "Organization", name: site.name, url: site.url },
          mainEntityOfPage: `${site.url}/blog/${post.slug}`,
          keywords: post.keywords.join(", "),
        }}
      />
      <Link href="/blog" className="text-sm text-mute hover:text-ivory">
        ← Journal
      </Link>
      <p className="mt-10 text-xs uppercase tracking-widest text-brass">{post.tag}</p>
      <h1 className="mt-4 font-serif text-4xl leading-[1.1] md:text-6xl">{post.title}</h1>
      <p className="mt-6 text-xl leading-relaxed text-mute">{post.description}</p>
      <p className="mt-8 border-b border-line pb-8 text-sm text-dim">
        {post.author} · {formatDate(post.date)} · {post.readingMinutes} min read
      </p>

      <div className="prose-journal mt-10" dangerouslySetInnerHTML={{ __html: post.html }} />

      <aside className="mt-16 rounded-3xl border border-brass/30 bg-gradient-to-br from-brass/10 to-transparent p-8">
        <p className="font-serif text-3xl leading-snug">Want to have this conversation with people who are living it?</p>
        <p className="mt-3 text-mute">
          {site.name} is an invite-only community for people building the AI era. {site.cohort.seatsTotal - site.cohort.seatsTaken} seats
          left in {site.cohort.name}.
        </p>
        <Link href="/apply" className="mt-6 inline-block rounded-full bg-ivory px-6 py-3 text-sm font-medium text-ink hover:bg-brass-2">
          Request an invitation →
        </Link>
      </aside>

      {more.length > 0 && (
        <div className="mt-16">
          <p className="text-sm text-dim">Keep reading</p>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {more.map((p) => (
              <Link key={p.slug} href={`/blog/${p.slug}`} className="rounded-2xl border border-line p-6 transition hover:border-mute/50">
                <p className="font-serif text-xl leading-snug">{p.title}</p>
                <p className="mt-3 text-xs text-dim">{p.readingMinutes} min read</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
