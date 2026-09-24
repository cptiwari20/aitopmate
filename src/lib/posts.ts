import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

// Journal posts live as Markdown files in /content/blog. Add a file, it becomes a page.
const dir = path.join(process.cwd(), "content/blog");

export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  tag: string;
  keywords: string[];
  readingMinutes: number;
  html: string;
};

function load(file: string): Post {
  const raw = fs.readFileSync(path.join(dir, file), "utf8");
  const { data, content } = matter(raw);
  return {
    slug: file.replace(/\.md$/, ""),
    title: data.title,
    description: data.description,
    date: data.date instanceof Date ? data.date.toISOString().slice(0, 10) : String(data.date),
    author: data.author ?? "TopAImate Editorial",
    tag: data.tag ?? "Essay",
    keywords: data.keywords ?? [],
    readingMinutes: Math.max(1, Math.round(content.split(/\s+/).length / 230)),
    html: marked.parse(content, { async: false }),
  };
}

export function getPosts(): Post[] {
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map(load)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPost(slug: string): Post | undefined {
  return getPosts().find((p) => p.slug === slug);
}

export function formatDate(d: string) {
  return new Date(d + "T00:00:00Z").toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}
