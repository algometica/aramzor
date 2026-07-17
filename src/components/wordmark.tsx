import Link from "next/link";

function Mark({ className }: { className: string }) {
  return (
    <span
      aria-hidden
      className={`relative shrink-0 rounded-full ${className}`}
      style={{
        background:
          "radial-gradient(circle at 35% 30%, #f2fff8 0%, #a8e6d4 35%, #4db8a4 70%, #143d36 100%)",
        boxShadow: "0 0 12px 2px rgba(125, 207, 182, 0.28)",
      }}
    />
  );
}

export function Wordmark({
  href = "/",
  size = "md",
  className = "",
}: {
  href?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const mark =
    size === "sm"
      ? "h-3.5 w-3.5"
      : size === "lg"
        ? "h-6 w-6"
        : "h-[18px] w-[18px]";
  const text =
    size === "sm"
      ? "text-[15px]"
      : size === "lg"
        ? "text-[24px]"
        : "text-[19px]";
  const gap = size === "lg" ? "gap-3" : size === "sm" ? "gap-2" : "gap-2.5";

  return (
    <Link
      href={href}
      className={`group inline-flex items-center rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg ${gap} ${className}`}
      aria-label="Aramzor home"
    >
      <Mark className={mark} />
      <span
        className={`font-display font-bold leading-none tracking-[-0.045em] text-text transition-colors group-hover:text-white ${text}`}
      >
        Aramzor
      </span>
    </Link>
  );
}
