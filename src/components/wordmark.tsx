import Link from "next/link";

const SIZE = {
  sm: {
    text: "text-[15px]",
    mark: "h-3.5 w-3.5",
    gap: "gap-2",
  },
  md: {
    text: "text-[19px]",
    mark: "h-[18px] w-[18px]",
    gap: "gap-2.5",
  },
  lg: {
    text: "text-[24px]",
    mark: "h-6 w-6",
    gap: "gap-3",
  },
} as const;

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
}: {
  href?: string;
  size?: "sm" | "md" | "lg";
}) {
  const s = SIZE[size];

  return (
    <Link
      href={href}
      className={`inline-flex items-center ${s.gap} group`}
      aria-label="Aramzor home"
    >
      <Mark className={s.mark} />
      <span
        className={`font-display font-bold tracking-[-0.045em] text-text leading-none group-hover:text-white transition-colors ${s.text}`}
      >
        Aramzor
      </span>
    </Link>
  );
}
