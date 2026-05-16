import Link from "next/link";
import { Logo } from "./logo";
import { footerNav } from "@/content/nav";
import { siteConfig } from "@/lib/seo";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-bg-subtle/40">
      <div className="container py-16">
        <div className="grid gap-10 lg:grid-cols-[1.4fr,3fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-fg-muted">
              {siteConfig.shortDescription}
            </p>
            <div className="mt-6 flex items-center gap-2">
              <span className="relative inline-flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success/60 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-success" />
              </span>
              <span className="text-xs text-fg-muted">Open for new projects</span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
            {(Object.entries(footerNav) as Array<[string, ReadonlyArray<{ label: string; href: string }>]>).map(
              ([heading, items]) => (
                <div key={heading}>
                  <h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-fg">
                    {heading}
                  </h3>
                  <ul className="mt-4 space-y-2.5">
                    {items.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className="text-sm text-fg-muted hover:text-accent-2 transition-colors"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ),
            )}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-fg-subtle">
            © {year} {siteConfig.legalName}. All rights reserved.
          </p>
          <a
            href={`mailto:${siteConfig.email}`}
            className="text-xs text-fg-subtle hover:text-fg-muted"
          >
            {siteConfig.email}
          </a>
        </div>
      </div>
    </footer>
  );
}
