import Link from "next/link";

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`inline-flex items-center gap-2.5 ${className}`} aria-label="TopAImate home">
      <span className="grid h-7 w-7 place-items-center rounded-full border border-brass/60 text-[11px] font-semibold tracking-tight text-brass">
        T
      </span>
      <span className="text-[15px] font-medium tracking-tight">
        Top<span className="font-serif text-[19px] italic text-brass">AI</span>mate
      </span>
    </Link>
  );
}
