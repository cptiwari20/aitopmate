import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-5 py-32 text-center">
      <p className="font-serif text-7xl italic text-brass">404</p>
      <h1 className="mt-4 font-serif text-4xl">This room doesn&apos;t exist — yet.</h1>
      <Link href="/" className="mt-8 inline-block text-sm text-mute hover:text-ivory">← Back home</Link>
    </div>
  );
}
