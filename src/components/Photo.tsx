import Image from "next/image";

// Full-bleed photo with a warm, slightly muted grade so stock images sit in the brand palette.
export default function Photo({
  src,
  alt,
  sizes,
  className = "",
  preload = false,
  overlay = true,
}: {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
  preload?: boolean;
  overlay?: boolean;
}) {
  return (
    <div className={`${className.includes("absolute") ? "" : "relative"} overflow-hidden ${className}`}>
      <Image src={src} alt={alt} fill sizes={sizes} preload={preload} className="photo-warm object-cover" />
      {overlay && <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />}
    </div>
  );
}
