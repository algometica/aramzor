import Link from "next/link";

export function Wordmark({
  href = "/",
  size = "md",
}: {
  href?: string;
  size?: "sm" | "md" | "lg";
}) {
  const sizeClass = {
    sm: "text-base",
    md: "text-lg",
    lg: "text-2xl",
  }[size];

  return (
    <Link
      href={href}
      className={`font-label font-bold tracking-[0.22em] text-ember uppercase ${sizeClass}`}
    >
      ARAMZOR
    </Link>
  );
}
