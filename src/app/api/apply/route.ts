import { NextResponse } from "next/server";
import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { randomBytes } from "node:crypto";
import {
  sendApplicationEmails,
  addApplicantToList,
  resendStatus,
  ResendStepError,
  type Application,
} from "@/lib/resend";

// Each application is:
//  - added to the Resend "Applicants" list (the source of truth in production),
//  - emailed to the team (with every answer) and confirmed to the applicant via Resend,
//  - appended to /data/applications.jsonl as a local backup when the filesystem allows it
//    (it doesn't on serverless hosts like Vercel).
// The application counts as saved if ANY of the three worked — the team email alone is a full record.

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

  const [listed, emailed, local] = await Promise.allSettled([
    addApplicantToList(app),
    sendApplicationEmails(app),
    saveLocally(app),
  ]);
  const failures = [listed, emailed, local]
    .filter((r): r is PromiseRejectedResult => r.status === "rejected")
    .map((r) => r.reason);
  failures.forEach((e) => console.error(`[apply] ${app.ref}:`, e));

  if (failures.length === 3) {
    // Only Resend's short error codes are returned (e.g. "list:restricted_api_key"), never secrets.
    const reasons = failures.filter((e) => e instanceof ResendStepError).map((e) => e.code);
    return NextResponse.json({ error: "Could not save application", reasons }, { status: 500 });
  }

  return NextResponse.json({ ref: app.ref });
}

// Health check: shows which Resend settings are present (true/false only, never their values).
export function GET() {
  return NextResponse.json({ resend: resendStatus() });
}
