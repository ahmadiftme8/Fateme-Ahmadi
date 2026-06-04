import Image from "next/image";

const PROFILE_SRC = "/fateme-pic.png";

/** One responsive profile asset for nav + hero so the browser reuses the same optimized URL. */
export const PROFILE_IMAGE_SIZES = "(max-width: 768px) 166px, 205px";

type ProfileImageProps = {
  alt: string;
  priority?: boolean;
  fetchPriority?: "high" | "low" | "auto";
  className?: string;
};

export function ProfileImage({
  alt,
  priority = false,
  fetchPriority = "auto",
  className,
}: ProfileImageProps) {
  return (
    <Image
      src={PROFILE_SRC}
      alt={alt}
      fill
      sizes={PROFILE_IMAGE_SIZES}
      quality={75}
      priority={priority}
      fetchPriority={fetchPriority}
      className={className}
    />
  );
}
