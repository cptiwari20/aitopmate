import { NextResponse } from "next/server";
import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { randomBytes } from "node:crypto";

// Stores applications as JSON lines in /data/applications.jsonl.
// Fine for local dev and a single server. On serverless hosting (e.g. Vercel) the
// filesystem is read-only — swap this for a database, Airtable or an email service.

const str = (v: unknown, max = 2000) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const list = (v: unknown) => (Array.isArray(v) ? v.filter((x) => typeof x === "string").slice(0, 10) : []);

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const app = {
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
  };

  if (!app.name || !/^\S+@\S+\.\S+$/.test(app.email) || !app.building || !app.fear || body.agree !== true) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 422 });
  }

  const ref = "TAM-" + randomBytes(3).toString("hex").toUpperCase();
  const dir = path.join(process.cwd(), "data");
  await mkdir(dir, { recursive: true });
  await appendFile(
    path.join(dir, "applications.jsonl"),
    JSON.stringify({ ref, submittedAt: new Date().toISOString(), status: "pending", ...app }) + "\n",
  );

  return NextResponse.json({ ref });
}
