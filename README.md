# TopAImate

An invite-only community site for people building the AI era: founders, engineers, operators, marketers, SDRs, recruiters and job seekers.

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## What's where

| You want to change…                                    | Edit this                    |
| ------------------------------------------------------ | ---------------------------- |
| Brand name, cohort seats, deadline, circles, FAQ       | `src/lib/site.ts`            |
| Homepage                                               | `src/app/page.tsx`           |
| Invitation form (steps, questions)                     | `src/components/ApplyForm.tsx` |
| Where applications are saved                           | `src/app/api/apply/route.ts` |
| Journal (blog) posts                                   | `content/blog/*.md`          |
| Colors and fonts                                       | `src/app/globals.css`, `src/app/layout.tsx` |

## Pages

- `/`: landing page (hero, fear & possibility, circles, what's inside, how invitations work, journal, FAQ)
- `/apply`: 4-step invitation request form
- `/circles`: access levels and what unlocks each one
- `/manifesto`: why the community exists and the house rules
- `/blog`, `/blog/[slug]`: the SEO journal
- `/sitemap.xml`, `/robots.txt`, `/opengraph-image`: generated automatically

## Adding a journal post

Create `content/blog/my-post.md`:

```md
---
title: "Your title with the main keyword"
description: "One or two sentences, shown on Google (about 155 characters)."
date: 2026-10-01
tag: Careers
keywords: ["main keyword", "related keyword"]
---

Your post in Markdown…
```

It shows up on the Journal, in the sitemap, and with its own SEO metadata.

## Before launch

1. Set `NEXT_PUBLIC_SITE_URL` to your real domain.
2. Replace the cohort numbers in `src/lib/site.ts` with real ones.
3. Applications are saved to `data/applications.jsonl`. That works locally and on a normal server, but **not on Vercel/serverless** (the filesystem there is read-only). Connect a database, Airtable, or an email service in `src/app/api/apply/route.ts`.
