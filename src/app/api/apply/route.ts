import { NextResponse } from "next/server";
import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { randomBytes } from "node:crypto";
import { resend, sendApplicationEmails, addApplicantToList, type Application } from "@/lib/resend";

// Each application is:
//  - added to the Resend "Applicants" list (the source of truth in production),
//  - emailed to the team and confirmed to the applicant via Resend,
//  - appended to /data/applications.jsonl as a local backup when the filesystem allows it
//    (it doesn't on serverless hosts like Vercel, which is fine once Resend is configured).

const str = (v: unknown, max = 2000) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const list = (v: unknown) => (Array.isArray(v) ? v.filter((x) => typeof x === "string").slice(0, 10) : []);

async function saveLocally(app: Application) {
  const dir = path.join(process.cwd(), "data");
  await mkdir(dir, { recursive: true });
  await appendFile(path.join(dir, "applications.jsonl"), JSON.stringify({ status: "pending", ...app }) + "\n");
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const app: Application = {
    ref: "TAM-" + randomBytes(3).toString("hex").toUpperCase(),
    submittedAt: new Date().toISOString(),
    name: str(body.name, 120),
    email: str(body.email, 200).toLowerCase(),
    linkedin: str(body.linkedin, 300),
    location: str(body.location, 120),
    role: str(body.role, 120),
    company: str(body.company, 160),
    years: str(body.years, 40),
    circles: list(body.circles),
    building: str(body.building),
    fear: str(body.fear),
    give: list(body.give),
    referral: str(body.referral, 120),
    updates: body.updates === true,
  };

  if (!app.name || !/^\S+@\S+\.\S+$/.test(app.email) || !app.building || !app.fear || body.agree !== true) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 422 });
  }

  // The list comes first: if we can't record the application anywhere, the applicant must be told.
  const [listed, local] = await Promise.allSettled([
    resend ? addApplicantToList(app) : Promise.reject(new Error("RESEND_API_KEY is not set")),
    saveLocally(app),
  ]);
  if (listed.status === "rejected") console.error(`[apply] ${app.ref} list:`, listed.reason);
  if (local.status === "rejected" && listed.status === "rejected") {
    console.error(`[apply] ${app.ref} local:`, local.reason);
    return NextResponse.json({ error: "Could not save application" }, { status: 500 });
  }

  // Emails are best-effort: the application is already recorded, so a send failure is logged, not surfaced.
  if (resend) {
    await sendApplicationEmails(app).catch((e) => console.error(`[apply] ${app.ref} email:`, e));
  }

  return NextResponse.json({ ref: app.ref });
}
