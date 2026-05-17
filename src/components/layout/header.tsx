"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Logo } from "./logo";
import { ButtonLink } from "@/components/ui/button";
import { primaryNav } from "@/content/nav";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Hide global header on landing, blog, and contact pages
  if (pathname === "/" || pathname.startsWith("/blog") || pathname.startsWith("/contact")) return null;

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-colors duration-200",
        scrolled
          ? "border-b border-border bg-bg/85 backdrop-blur-md supports-[backdrop-filter]:bg-bg/70"
          : "border-b border-transparent bg-bg/0",
      )}
    >
      <div className="container flex h-16 items-center justify-between gap-6">
        <div className="flex items-center gap-8">
          <Logo />
          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {primaryNav.map((item) => {
                const active = pathname === item.href || pathname.startsWith(item.href + "/");
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                        active
                          ? "text-fg"
                          : "text-fg-muted hover:text-fg hover:bg-bg-subtle",
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        <div className="hidden lg:flex items-center gap-2">
          <ButtonLink href="/contact" size="sm">
            Start a project
          </ButtonLink>
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((s) => !s)}
          className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-md text-fg-muted hover:text-fg hover:bg-bg-subtle"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div
          id="mobile-nav"
          className="lg:hidden border-t border-border bg-bg/95 backdrop-blur-md"
        >
          <nav aria-label="Mobile" className="container py-4">
            <ul className="flex flex-col gap-1">
              {primaryNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="block rounded-md px-3 py-2.5 text-[15px] text-fg-muted hover:text-fg hover:bg-bg-subtle"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li className="pt-3 mt-2 border-t border-border">
                <ButtonLink href="/contact" className="w-full">
                  Start a project
                </ButtonLink>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}
