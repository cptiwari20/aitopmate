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
| Application emails and the Resend list                 | `src/lib/resend.ts`          |
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

## Emails and the applicant list (Resend)

Every application:

1. is added to your **Resend contacts** in an "Applicants" segment, with their role, circles, company, location, LinkedIn, reference and `application_status = pending` saved as contact properties;
2. sends a **notification to the team** (reply goes straight to the applicant);
3. sends a **confirmation to the applicant** with their reference number.

People who untick "Send me cohort news" are still added to the list, but marked unsubscribed, so broadcasts skip them.

Setup (about 5 minutes):

1. Create an API key at [resend.com/api-keys](https://resend.com/api-keys) and verify your domain at [resend.com/domains](https://resend.com/domains).
2. `cp .env.example .env.local` and fill in `RESEND_API_KEY`, `RESEND_FROM` and `TEAM_EMAILS`.
3. Run `npm run resend:setup`. It creates the "Applicants" segment and the contact properties, then prints a `RESEND_SEGMENT_ID` to paste into `.env.local`.
4. Add the same env vars to your host (e.g. Vercel → Settings → Environment Variables).

When you accept someone, change their `application_status` in Resend to `accepted`. You can then send a Broadcast to that group from the Resend dashboard.

Locally, applications are also appended to `data/applications.jsonl` as a backup. On Vercel that file can't be written, which is fine, because Resend is the list.

## Before launch

1. Set `NEXT_PUBLIC_SITE_URL` to your real domain.
2. Replace the cohort numbers in `src/lib/site.ts` with real ones.
3. Complete the Resend setup above.
