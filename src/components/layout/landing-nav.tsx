"use client";

import * as React from "react";
import Link from "next/link";

export function LandingNav() {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  // Lock body scroll when mobile menu is open
  React.useEffect(() => {
    if (mobileOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [mobileOpen]);

  // Close mobile menu on Escape
  React.useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  // Navbar scroll state
  React.useEffect(() => {
    const nav = document.getElementById("nav");
    if (!nav) return;
    const onScroll = () => {
      nav.classList.toggle("scrolled", window.scrollY > 20);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav className="nav" id="nav">
        <div className="container nav-inner">
          <Link href="/" className="logo" onClick={() => setMobileOpen(false)} aria-label="Amplixia">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.svg" alt="Amplixia" className="logo-img" />
          </Link>
          <ul className="nav-links">
            <li><Link href="/#work">Work</Link></li>
            <li><Link href="/#services">Services</Link></li>
            <li><Link href="/#process">Process</Link></li>
            <li><Link href="/#insights">Insights</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
          <Link href="/contact" className="btn btn-primary nav-cta-desktop">
            Book a call <span className="btn-arrow">→</span>
          </Link>
          <button
            type="button"
            className={`hamburger ${mobileOpen ? "is-open" : ""}`}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            onClick={() => setMobileOpen((v) => !v)}
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      <div
        className={`mobile-menu ${mobileOpen ? "is-open" : ""}`}
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-hidden={!mobileOpen}
      >
        <ul className="mobile-menu-links">
          <li><Link href="/#work"     onClick={() => setMobileOpen(false)}>Work</Link></li>
          <li><Link href="/#services" onClick={() => setMobileOpen(false)}>Services</Link></li>
          <li><Link href="/#process"  onClick={() => setMobileOpen(false)}>Process</Link></li>
          <li><Link href="/#insights" onClick={() => setMobileOpen(false)}>Insights</Link></li>
          <li><Link href="/contact"  onClick={() => setMobileOpen(false)}>Contact</Link></li>
        </ul>
        <Link
          href="/contact"
          className="btn btn-primary mobile-cta"
          onClick={() => setMobileOpen(false)}
        >
          Book a call <span className="btn-arrow">→</span>
        </Link>
        <div className="mobile-menu-foot">
          <a href="mailto:services@amplixia.com">services@amplixia.com</a>
        </div>
      </div>
      <div
        className={`mobile-backdrop ${mobileOpen ? "is-open" : ""}`}
        onClick={() => setMobileOpen(false)}
        aria-hidden="true"
      />
    </>
  );
}
