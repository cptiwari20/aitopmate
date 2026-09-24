"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { circles, site } from "@/lib/site";

type Data = {
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
  agree: boolean;
};

const empty: Data = {
  name: "",
  email: "",
  linkedin: "",
  location: "",
  role: "",
  company: "",
  years: "",
  circles: [],
  building: "",
  fear: "",
  give: [],
  referral: "",
  agree: false,
};

const steps = ["You", "Your work", "Your perspective", "Commitment"];
const yearsOptions = ["Just starting", "Under 1 year", "1–3 years", "3–5 years", "5+ years"];
const giveOptions = [
  "Review projects",
  "Mentor job seekers",
  "Hire members",
  "Host a session",
  "Join a build squad",
  "Make intros",
];

const MIN_ANSWER = 80;

export default function ApplyForm() {
  const [step, setStep] = useState(0);
  const [d, setD] = useState<Data>(empty);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [ref, setRef] = useState("");
  const top = useRef<HTMLDivElement>(null);

  function go(s: number) {
    setStep(s);
    const el = top.current;
    if (el && el.getBoundingClientRect().top < 0) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  const set = <K extends keyof Data>(k: K, v: Data[K]) => setD((x) => ({ ...x, [k]: v }));
  const toggle = (k: "circles" | "give", v: string) =>
    set(k, d[k].includes(v) ? d[k].filter((x) => x !== v) : [...d[k], v]);

  function validate(s: number) {
    const e: Record<string, string> = {};
    if (s === 0) {
      if (d.name.trim().length < 2) e.name = "Please share your full name.";
      if (!/^\S+@\S+\.\S+$/.test(d.email)) e.email = "A valid email, please — that's where your invitation goes.";
      if (!/linkedin\.com\/|^https?:\/\//i.test(d.linkedin)) e.linkedin = "Link to LinkedIn or a personal site.";
    }
    if (s === 1) {
      if (!d.role.trim()) e.role = "What do you do?";
      if (!d.years) e.years = "Pick one.";
      if (d.circles.length === 0) e.circles = "Choose at least one circle.";
    }
    if (s === 2) {
      if (d.building.trim().length < MIN_ANSWER) e.building = `A little more detail — at least ${MIN_ANSWER} characters.`;
      if (d.fear.trim().length < MIN_ANSWER) e.fear = `Be honest and specific — at least ${MIN_ANSWER} characters.`;
    }
    if (s === 3) {
      if (d.give.length === 0) e.give = "Pick at least one way you'd contribute.";
      if (!d.agree) e.agree = "Please agree to the house rules.";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function next() {
    if (validate(step)) go(step + 1);
  }

  async function submit() {
    if (!validate(3)) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(d),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      setRef(json.ref);
      setStatus("done");
      top.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div ref={top} className="fade-up scroll-mt-24 rounded-3xl border border-line bg-ink-2/80 p-8 text-center md:p-12">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full border border-brass/50 text-2xl text-brass">✦</div>
        <h2 className="mt-6 font-serif text-4xl">Application received.</h2>
        <p className="mx-auto mt-4 max-w-md leading-relaxed text-mute">
          Thank you, {d.name.split(" ")[0]}. A member of the founding team will read it personally. Expect to hear from us at{" "}
          <span className="text-ivory">{d.email}</span> within {site.cohort.reviewDays}.
        </p>
        <p className="mt-8 inline-block rounded-full border border-line px-4 py-2 font-mono text-sm text-mute">
          Reference · <span className="text-brass">{ref}</span>
        </p>
        <div className="mt-10">
          <Link href="/blog" className="text-sm text-brass hover:text-brass-2">
            While you wait, read the Journal →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div ref={top} className="scroll-mt-24 rounded-3xl border border-line bg-ink-2/80 shadow-2xl shadow-black/40">
      {/* progress */}
      <div className="border-b border-line p-6 md:px-10">
        <div className="flex items-center justify-between text-xs text-dim">
          <span>
            Step {step + 1} of {steps.length}
          </span>
          <span className="text-mute">{steps[step]}</span>
        </div>
        <div className="mt-3 grid grid-cols-4 gap-1.5">
          {steps.map((s, i) => (
            <div key={s} className={`h-1 rounded-full transition-colors ${i <= step ? "bg-brass" : "bg-line"}`} />
          ))}
        </div>
      </div>

      <div className="p-6 md:p-10">
        {step === 0 && (
          <Fieldset title="Let's start with you." hint="We only use this to review your application and send your invitation.">
            <Field label="Full name" error={errors.name}>
              <input className={input} value={d.name} onChange={(e) => set("name", e.target.value)} placeholder="Ada Okafor" autoComplete="name" />
            </Field>
            <Field label="Work email" error={errors.email}>
              <input className={input} type="email" value={d.email} onChange={(e) => set("email", e.target.value)} placeholder="ada@company.ai" autoComplete="email" />
            </Field>
            <Field label="LinkedIn or personal site" error={errors.linkedin}>
              <input className={input} value={d.linkedin} onChange={(e) => set("linkedin", e.target.value)} placeholder="https://linkedin.com/in/…" />
            </Field>
            <Field label="City, country" optional>
              <input className={input} value={d.location} onChange={(e) => set("location", e.target.value)} placeholder="Bengaluru, India" />
            </Field>
          </Fieldset>
        )}

        {step === 1 && (
          <Fieldset title="What do you do in AI?" hint="Titles matter less than the work. Tell us plainly.">
            <div className="grid gap-5 md:grid-cols-2">
              <Field label="Role" error={errors.role}>
                <input className={input} value={d.role} onChange={(e) => set("role", e.target.value)} placeholder="Founder, ML engineer, SDR lead…" />
              </Field>
              <Field label="Company or project" optional>
                <input className={input} value={d.company} onChange={(e) => set("company", e.target.value)} placeholder="Where you work or what you're building" />
              </Field>
            </div>
            <Field label="Time working with AI" error={errors.years}>
              <div className="flex flex-wrap gap-2">
                {yearsOptions.map((y) => (
                  <Chip key={y} active={d.years === y} onClick={() => set("years", y)}>
                    {y}
                  </Chip>
                ))}
              </div>
            </Field>
            <Field label="Which circles are you applying for?" error={errors.circles}>
              <div className="grid gap-2.5 sm:grid-cols-2">
                {circles.map((c) => {
                  const on = d.circles.includes(c.slug);
                  return (
                    <button
                      type="button"
                      key={c.slug}
                      onClick={() => toggle("circles", c.slug)}
                      aria-pressed={on}
                      className={`rounded-2xl border p-4 text-left transition ${
                        on ? "border-brass bg-brass/10" : "border-line bg-ink hover:border-mute/50"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{c.name}</span>
                        <span className={`grid h-5 w-5 place-items-center rounded-full border text-[10px] ${on ? "border-brass bg-brass text-ink" : "border-line"}`}>
                          {on ? "✓" : ""}
                        </span>
                      </div>
                      <p className="mt-1.5 text-xs leading-relaxed text-dim">{c.access}</p>
                    </button>
                  );
                })}
              </div>
            </Field>
          </Fieldset>
        )}

        {step === 2 && (
          <Fieldset
            title="The two questions that matter."
            hint="This is what we actually read closely. There are no right answers — only honest ones."
          >
            <Field label="What are you building — or want to build — with AI?" error={errors.building}>
              <Textarea value={d.building} onChange={(v) => set("building", v)} placeholder="The problem, who it's for, and where you are with it today." />
            </Field>
            <Field label="What about AI genuinely worries you?" error={errors.fear}>
              <Textarea value={d.fear} onChange={(v) => set("fear", v)} placeholder="For your career, your team, your industry, or the people around you." />
            </Field>
          </Fieldset>
        )}

        {step === 3 && (
          <Fieldset title="What would you bring to the room?" hint="Every member gives something. Pick what fits you.">
            <Field label="I'd be glad to…" error={errors.give}>
              <div className="flex flex-wrap gap-2">
                {giveOptions.map((g) => (
                  <Chip key={g} active={d.give.includes(g)} onClick={() => toggle("give", g)}>
                    {g}
                  </Chip>
                ))}
              </div>
            </Field>
            <Field label="Referred by a member?" optional>
              <input className={input} value={d.referral} onChange={(e) => set("referral", e.target.value)} placeholder="Their name or invite code" />
            </Field>
            <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-line bg-ink p-4 text-sm">
              <input type="checkbox" checked={d.agree} onChange={(e) => set("agree", e.target.checked)} className="mt-0.5 h-4 w-4 accent-[var(--color-brass)]" />
              <span className="leading-relaxed text-mute">
                I&apos;ll use my real name, keep conversations off the record, and give before I ask.{" "}
                <Link href="/manifesto" target="_blank" className="text-brass underline underline-offset-2">
                  Read the house rules
                </Link>
              </span>
            </label>
            {errors.agree && <p className="-mt-3 text-xs text-ember">{errors.agree}</p>}
            {status === "error" && (
              <p className="rounded-xl border border-ember/40 bg-ember/10 p-3 text-sm text-ember">
                Something went wrong sending your application. Please try again, or email {site.email}.
              </p>
            )}
          </Fieldset>
        )}

        <div className="mt-10 flex items-center justify-between border-t border-line pt-6">
          <button
            type="button"
            onClick={() => go(step - 1)}
            className={`text-sm text-mute hover:text-ivory ${step === 0 ? "invisible" : ""}`}
          >
            ← Back
          </button>
          {step < steps.length - 1 ? (
            <button type="button" onClick={next} className="rounded-full bg-ivory px-6 py-3 text-sm font-medium text-ink hover:bg-brass-2">
              Continue →
            </button>
          ) : (
            <button
              type="button"
              onClick={submit}
              disabled={status === "sending"}
              className="rounded-full bg-brass px-6 py-3 text-sm font-medium text-ink hover:bg-brass-2 disabled:opacity-60"
            >
              {status === "sending" ? "Sending…" : "Submit application"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

const input =
  "w-full rounded-xl border border-line bg-ink px-4 py-3 text-ivory placeholder:text-dim outline-none transition focus:border-brass/70 focus:ring-2 focus:ring-brass/15";

function Fieldset({ title, hint, children }: { title: string; hint: string; children: React.ReactNode }) {
  return (
    <div className="fade-up space-y-6">
      <div>
        <h2 className="font-serif text-3xl md:text-4xl">{title}</h2>
        <p className="mt-2 text-sm text-mute">{hint}</p>
      </div>
      {children}
    </div>
  );
}

function Field({ label, error, optional, children }: { label: string; error?: string; optional?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-2 flex justify-between text-sm">
        <span className="text-ivory/90">{label}</span>
        {optional && <span className="text-dim">Optional</span>}
      </p>
      {children}
      {error && <p className="mt-2 text-xs text-ember">{error}</p>}
    </div>
  );
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full border px-4 py-2 text-sm transition ${
        active ? "border-brass bg-brass/15 text-brass-2" : "border-line text-mute hover:border-mute/50 hover:text-ivory"
      }`}
    >
      {children}
    </button>
  );
}

function Textarea({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder: string }) {
  const n = value.trim().length;
  return (
    <div className="relative">
      <textarea rows={5} className={`${input} resize-none`} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} />
      <span className={`absolute bottom-3 right-4 text-xs tabular-nums ${n >= MIN_ANSWER ? "text-brass" : "text-dim"}`}>
        {n}/{MIN_ANSWER}
      </span>
    </div>
  );
}
