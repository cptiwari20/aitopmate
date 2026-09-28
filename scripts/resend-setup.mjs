// One-time Resend setup: creates the "Applicants" segment and the contact properties
// the application form writes to. Safe to re-run — existing items are skipped.
//
//   npm run resend:setup
//
// Then copy the printed RESEND_SEGMENT_ID into .env.local (and your host's env vars).

import { Resend } from "resend";

const key = process.env.RESEND_API_KEY;
if (!key) {
  console.error("Set RESEND_API_KEY first (e.g. in .env.local).");
  process.exit(1);
}
const resend = new Resend(key);

// Keep in sync with CONTACT_PROPERTIES in src/lib/resend.ts
const properties = [
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
];

const existing = await resend.contactProperties.list();
if (existing.error) throw new Error(existing.error.message);
const have = new Set(existing.data.data.map((p) => p.key));
for (const key of properties) {
  if (have.has(key)) {
    console.log(`✓ property ${key} (exists)`);
    continue;
  }
  const { error } = await resend.contactProperties.create({ key, type: "string", fallbackValue: "" });
  console.log(error ? `✗ property ${key}: ${error.message}` : `✓ property ${key} (created)`);
}

const segments = await resend.segments.list();
if (segments.error) throw new Error(segments.error.message);
let segment = segments.data.data.find((s) => s.name === "Applicants");
if (!segment) {
  const created = await resend.segments.create({ name: "Applicants" });
  if (created.error) throw new Error(created.error.message);
  segment = created.data;
  console.log("✓ segment Applicants (created)");
} else {
  console.log("✓ segment Applicants (exists)");
}

console.log(`\nAdd this to .env.local and your hosting env vars:\n\nRESEND_SEGMENT_ID=${segment.id}\n`);
