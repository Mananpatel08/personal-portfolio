"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useSyncExternalStore } from "react";
import { nav } from "@/lib/data/nav";
import { profile } from "@/lib/data/profile";
import { cn } from "@/lib/utils";

/**
 * Deliberately quiet: a wordmark, five links, and a rule that only appears
 * once you’ve scrolled past the hero. Mobile gets a full-screen overlay so the
 * navigation can be set large rather than crammed.
 */
/** Scroll position is external state — read it, don't mirror it. */
function subscribeToScroll(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
}

export function SiteHeader() {
  const pathname = usePathname();
  const scrolled = useSyncExternalStore(
    subscribeToScroll,
    () => window.scrollY > 12,
    () => false,
  );

  /* Store the route the menu was opened on rather than a boolean. Navigating
     anywhere — including back and forward — closes it without an effect. */
  const [openedAt, setOpenedAt] = useState<string | null>(null);
  const open = openedAt === pathname;
  const close = () => setOpenedAt(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 transition-colors duration-500",
        scrolled
          ? "border-b border-line bg-paper/80 backdrop-blur-md"
          : "border-b border-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-5 sm:px-8 lg:px-10">
        <Link
          href="/"
          className="group flex items-center gap-2.5 text-micro font-medium tracking-[-0.01em] text-ink"
        >
          <span className="size-1.5 rounded-full bg-accent transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.6]" />
          <span className="ulink">{profile.name}</span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={cn(
                "rounded-full px-3 py-1.5 text-micro transition-colors duration-300",
                isActive(item.href)
                  ? "text-ink"
                  : "text-ink-soft hover:text-ink",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setOpenedAt(open ? null : pathname)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          className="-mr-1 flex items-center gap-2 rounded-full px-2 py-1.5 text-micro text-ink-soft md:hidden"
        >
          {open ? "Close" : "Menu"}
          <span className="flex w-3.5 flex-col gap-[3px]">
            <span
              className={cn(
                "h-px w-full bg-current transition-transform duration-300",
                open && "translate-y-[2px] rotate-45",
              )}
            />
            <span
              className={cn(
                "h-px w-full bg-current transition-transform duration-300",
                open && "-translate-y-[2px] -rotate-45",
              )}
            />
          </span>
        </button>
      </div>

      {open && (
        <div
          id="mobile-nav"
          className="fixed inset-x-0 top-16 bottom-0 z-40 border-t border-line bg-paper px-5 pt-10 md:hidden"
        >
          <nav aria-label="Primary" className="flex flex-col">
            {nav.map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rise-in border-b border-line py-4 text-title",
                  isActive(item.href) ? "text-ink" : "text-ink-faint",
                )}
                style={{ animationDelay: `${i * 45}ms` }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <p className="mt-10 text-micro text-ink-soft">
            {profile.location.short} · {profile.location.offset}
          </p>
        </div>
      )}
    </header>
  );
}
