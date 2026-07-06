import Link from "next/link";

export function Wordmark({
  href = "/",
  size = "md",
}: {
  href?: string;
  size?: "sm" | "md" | "lg";
}) {
  const sizeClass = {
    sm: "text-xl",
    md: "text-2xl",
    lg: "text-3xl",
  }[size];

  return (
    <Link
      href={href}
      className={`font-display italic font-bold tracking-widest text-ember uppercase ${sizeClass}`}
    >
      ARAMZOR
    </Link>
  );
}
