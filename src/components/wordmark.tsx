import Link from "next/link";

export function Wordmark({
  href = "/",
  size = "md",
}: {
  href?: string;
  size?: "sm" | "md" | "lg";
}) {
  const sizeClass = {
    sm: "text-[15px]",
    md: "text-[17px]",
    lg: "text-2xl",
  }[size];

  return (
    <Link
      href={href}
      className={`font-display font-semibold tracking-[-0.02em] text-text ${sizeClass}`}
    >
      Aramzor
    </Link>
  );
}
