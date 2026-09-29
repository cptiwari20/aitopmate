import { Resend } from "resend";
import { site, circles } from "@/lib/site";

// Resend powers two things:
//  1. Emails — a notification to the team and a confirmation to the applicant.
//  2. The list — every applicant becomes a Resend contact in the "Applicants" segment,
//     with their answers stored as contact properties you can filter and broadcast to.
//
// Env vars (see .env.example):
//   RESEND_API_KEY      required
//   RESEND_FROM         e.g. "TopAImate <invites@topaimate.com>" (domain must be verified in Resend)
//   TEAM_EMAILS         comma-separated inboxes that receive new applications
//   RESEND_SEGMENT_ID   the "Applicants" segment id (created by `npm run resend:setup`)

export type Application = {
  ref: string;
  submittedAt: string;
  name: string;
  email: string;
  linkedin: string;
  location: string;
  role: string;
  company: string;
  years: string;
  circles: string[];
  building: string;
  fear: string;
  give: string[];
  referral: string;
  updates: boolean;
};

// Keys must match the contact properties created by scripts/resend-setup.mjs.
export const CONTACT_PROPERTIES = [
  "application_ref",
  "application_status",
  "role",
  "company",
  "years_in_ai",
  "circles",
  "location",
  "linkedin",
  "referral",
  "applied_at",
] as const;

const apiKey = process.env.RESEND_API_KEY;
export const resend = apiKey ? new Resend(apiKey) : null;

const from = process.env.RESEND_FROM ?? `${site.name} <onboarding@resend.dev>`;
const teamEmails = (process.env.TEAM_EMAILS ?? site.email)
  .split(",")
  .map((e) => e.trim())
  .filter(Boolean);
const segmentId = process.env.RESEND_SEGMENT_ID;

const circleNames = (slugs: string[]) =>
  slugs.map((s) => circles.find((c) => c.slug === s)?.name ?? s).join(", ");

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

const para = (s: string) => esc(s).replace(/\n/g, "<br/>");

function splitName(name: string) {
  const [firstName, ...rest] = name.trim().split(/\s+/);
  return { firstName, lastName: rest.join(" ") || undefined };
}

/* ---------- emails ---------- */

function layout(body: string) {
  return `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head><body style="margin:0;background:#0b0b0c;padding:32px 16px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Inter,Arial,sans-serif;color:#f3efe6">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td align="center">
<table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;background:#121214;border:1px solid #26262a;border-radius:20px">
<tr><td style="padding:32px 32px 8px;font-size:15px;letter-spacing:-.2px">Top<span style="font-family:Georgia,serif;font-style:italic;color:#d4a55a">AI</span>mate</td></tr>
<tr><td style="padding:8px 32px 32px;font-size:15px;line-height:1.7;color:#d9d4c9">${body}</td></tr>
</table>
<p style="font-size:12px;color:#6d6a64;margin:20px 0 0">${site.name} · Invite only · <a href="${site.url}" style="color:#6d6a64">${site.url.replace(/^https?:\/\//, "")}</a></p>
</td></tr></table></body></html>`;
}

function applicantEmail(a: Application) {
  const first = splitName(a.name).firstName;
  const html = layout(`
<h1 style="font-family:Georgia,serif;font-weight:400;font-size:30px;line-height:1.2;color:#f3efe6;margin:16px 0 20px">We've got your application, ${esc(first)}.</h1>
<p style="margin:0 0 16px">Thank you for applying to ${site.name}. A member of the founding team reads every application by hand, and you'll hear from us within <strong style="color:#f3efe6">${site.cohort.reviewDays}</strong>.</p>
<p style="margin:0 0 16px">You applied for: <strong style="color:#f3efe6">${esc(circleNames(a.circles))}</strong>.</p>
<p style="margin:0 0 24px">Some applicants are invited to a short call first. It's a conversation, not an interview.</p>
<p style="margin:0 0 24px;display:inline-block;border:1px solid #26262a;border-radius:999px;padding:8px 16px;font-family:Menlo,monospace;font-size:13px;color:#a19d94">Reference · <span style="color:#d4a55a">${a.ref}</span></p>
<p style="margin:0 0 8px">While you wait, the Journal is a good place to start:</p>
<p style="margin:0 0 24px"><a href="${site.url}/blog" style="color:#e8c486">Read the Journal →</a></p>
<p style="margin:0;color:#a19d94">— The ${site.name} team</p>`);
  const text = `We've got your application, ${first}.

Thank you for applying to ${site.name}. A member of the founding team reads every application by hand, and you'll hear from us within ${site.cohort.reviewDays}.

You applied for: ${circleNames(a.circles)}
Reference: ${a.ref}

While you wait, read the Journal: ${site.url}/blog

— The ${site.name} team`;
  return {
    from,
    to: [a.email],
    replyTo: teamEmails[0],
    subject: `Your ${site.name} application is in (${a.ref})`,
    html,
    text,
  };
}

function teamEmail(a: Application) {
  const row = (k: string, v: string) =>
    v
      ? `<tr><td style="padding:6px 16px 6px 0;color:#6d6a64;vertical-align:top;white-space:nowrap">${k}</td><td style="padding:6px 0;color:#f3efe6">${v}</td></tr>`
      : "";
  const html = layout(`
<p style="margin:16px 0 4px;font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#d4a55a">New application · ${a.ref}</p>
<h1 style="font-family:Georgia,serif;font-weight:400;font-size:28px;color:#f3efe6;margin:0 0 20px">${esc(a.name)}</h1>
<table role="presentation" cellpadding="0" cellspacing="0" style="font-size:14px;margin:0 0 24px">
${row("Email", `<a href="mailto:${esc(a.email)}" style="color:#e8c486">${esc(a.email)}</a>`)}
${row("Profile", `<a href="${esc(a.linkedin)}" style="color:#e8c486">${esc(a.linkedin)}</a>`)}
${row("Role", esc([a.role, a.company].filter(Boolean).join(" · ")))}
${row("Time in AI", esc(a.years))}
${row("Circles", esc(circleNames(a.circles)))}
${row("Location", esc(a.location))}
${row("Would give", esc(a.give.join(", ")))}
${row("Referred by", esc(a.referral))}
${row("Updates", a.updates ? "Opted in" : "No")}
</table>
<p style="margin:0 0 6px;color:#d4a55a">What they're building</p>
<p style="margin:0 0 20px;color:#f3efe6">${para(a.building)}</p>
<p style="margin:0 0 6px;color:#e0775a">What worries them about AI</p>
<p style="margin:0 0 8px;color:#f3efe6">${para(a.fear)}</p>
<p style="margin:24px 0 0;font-size:13px;color:#6d6a64">Reply to this email to answer ${esc(splitName(a.name).firstName)} directly.</p>`);
  const text = `New application ${a.ref}

${a.name} <${a.email}>
${a.linkedin}
Role: ${a.role}${a.company ? " · " + a.company : ""}
Time in AI: ${a.years}
Circles: ${circleNames(a.circles)}
Location: ${a.location}
Would give: ${a.give.join(", ")}
Referred by: ${a.referral}
Updates: ${a.updates ? "Opted in" : "No"}

What they're building:
${a.building}

What worries them about AI:
${a.fear}`;
  return {
    from,
    to: teamEmails,
    replyTo: a.email,
    subject: `New application: ${a.name} · ${circleNames(a.circles)} (${a.ref})`,
    html,
    text,
  };
}

// Errors carry Resend's short error name (e.g. "restricted_api_key") so the API route can
// report *why* something failed without exposing secrets.
export class ResendStepError extends Error {
  constructor(
    public code: string,
    message: string,
  ) {
    super(message);
  }
}

const fail = (step: string, error: { name?: string; message: string }) =>
  new ResendStepError(`${step}:${error.name ?? "error"}`, `Resend ${step} failed: ${error.message}`);

export function resendStatus() {
  return {
    apiKey: Boolean(apiKey),
    from: Boolean(process.env.RESEND_FROM),
    teamEmails: Boolean(process.env.TEAM_EMAILS),
    segmentId: Boolean(segmentId),
  };
}

// Sent separately so a problem with the applicant's address can't block the team notification.
// Only a failed team email throws: that email is a complete record of the application.
export async function sendApplicationEmails(a: Application) {
  if (!resend) throw new ResendStepError("email:missing_api_key", "RESEND_API_KEY is not set");
  const [team, applicant] = await Promise.all([resend.emails.send(teamEmail(a)), resend.emails.send(applicantEmail(a))]);
  if (applicant.error) console.error(`[resend] ${a.ref} confirmation email failed: ${applicant.error.message}`);
  if (team.error) throw fail("email", team.error);
}

/* ---------- list ---------- */

export async function addApplicantToList(a: Application) {
  if (!resend) throw new ResendStepError("list:missing_api_key", "RESEND_API_KEY is not set");
  const { firstName, lastName } = splitName(a.name);
  const properties: Record<(typeof CONTACT_PROPERTIES)[number], string> = {
    application_ref: a.ref,
    application_status: "pending",
    role: a.role,
    company: a.company,
    years_in_ai: a.years,
    circles: a.circles.join(","),
    location: a.location,
    linkedin: a.linkedin,
    referral: a.referral,
    applied_at: a.submittedAt,
  };
  const base = { email: a.email, firstName, lastName, unsubscribed: !a.updates };
  const segments = segmentId ? [{ id: segmentId }] : undefined;

  const created = await resend.contacts.create({ ...base, properties, segments });
  if (!created.error) return;

  // The person may have applied before — update the existing contact instead.
  const updated = await resend.contacts.update({ ...base, properties });
  if (!updated.error) {
    if (segmentId) {
      const added = await resend.contacts.segments.add({ email: a.email, segmentId });
      if (added.error) console.warn(`[resend] could not add ${a.ref} to segment: ${added.error.message}`);
    }
    return;
  }

  // Custom properties or the segment may not exist yet (`npm run resend:setup` not run).
  // Still get the person onto the list with just their name and email.
  const minimal = await resend.contacts.create(base);
  if (!minimal.error) {
    console.warn(`[resend] ${a.ref} saved without properties: ${created.error.message}`);
    return;
  }
  throw fail("list", created.error);
}
