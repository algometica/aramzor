"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";

import { signOutAction } from "@/app/auth-actions";

type Props = {
  signedIn: boolean;
  variant: "marketing" | "app";
};

const linkClass =
  "flex min-h-12 items-center rounded-xl px-3 text-[15px] font-medium text-text transition-colors hover:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent";

export function MobileNav({ signedIn, variant }: Props) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const firstLink = panelRef.current?.querySelector<HTMLElement>(
      "a, button",
    );
    firstLink?.focus();

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previous;
    };
  }, [open]);

  if (!signedIn && variant === "marketing") {
    return (
      <Link
        href="/login"
        className="inline-flex min-h-11 items-center text-[14px] font-medium text-accent hover:text-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg sm:hidden"
      >
        Sign In
      </Link>
    );
  }

  if (!signedIn) {
    return null;
  }

  return (
    <div className="relative sm:hidden">
      <button
        ref={buttonRef}
        type="button"
        className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg text-text-muted transition-colors hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        aria-expanded={open}
        aria-controls={panelId}
        aria-haspopup="true"
        onClick={() => setOpen((value) => !value)}
      >
        <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        <span aria-hidden className="flex w-5 flex-col gap-1.5">
          <span
            className={`h-px w-full bg-current transition-transform ${
              open ? "translate-y-[3.5px] rotate-45" : ""
            }`}
          />
          <span
            className={`h-px w-full bg-current transition-opacity ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`h-px w-full bg-current transition-transform ${
              open ? "-translate-y-[3.5px] -rotate-45" : ""
            }`}
          />
        </span>
      </button>

      {open ? (
        <>
          <button
            type="button"
            className="fixed inset-0 z-40 bg-black/60"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          />
          <div
            ref={panelRef}
            id={panelId}
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="absolute right-0 top-12 z-50 w-[min(18rem,calc(100vw-2rem))] rounded-2xl border border-white/10 bg-surface-low p-2 shadow-ambient"
          >
            <nav aria-label="Mobile primary">
              <ul className="m-0 list-none space-y-0.5 p-0">
                {variant === "marketing" ? (
                  <>
                    <li>
                      <Link
                        href="/science"
                        className={linkClass}
                        onClick={() => setOpen(false)}
                      >
                        Science
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/about"
                        className={linkClass}
                        onClick={() => setOpen(false)}
                      >
                        About
                      </Link>
                    </li>
                  </>
                ) : null}
                <li>
                  <Link
                    href="/dashboard"
                    className={linkClass}
                    onClick={() => setOpen(false)}
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    href="/profile"
                    className={linkClass}
                    onClick={() => setOpen(false)}
                  >
                    Account
                  </Link>
                </li>
                <li>
                  <form action={signOutAction}>
                    <button type="submit" className={`${linkClass} w-full`}>
                      Sign out
                    </button>
                  </form>
                </li>
              </ul>
            </nav>
          </div>
        </>
      ) : null}
    </div>
  );
}
