import Image from "next/image";
import { faces } from "@/lib/photos";

export default function FaceStack({ count = 6, size = 36 }: { count?: number; size?: number }) {
  return (
    <div className="flex -space-x-2.5">
      {faces.slice(0, count).map((src) => (
        <Image
          key={src}
          src={`${src}?w=${size * 2}&h=${size * 2}&fit=crop&crop=faces`}
          alt=""
          width={size}
          height={size}
          unoptimized
          className="photo-warm rounded-full border-2 border-ink object-cover"
        />
      ))}
    </div>
  );
}
