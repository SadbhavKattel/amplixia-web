"use client";

import * as React from "react";
import "./landing.css";

export default function HomePage() {
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

  // Reveal on scroll (covers all reveal variants)
  React.useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    document
      .querySelectorAll(".reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-text, .reveal-stagger")
      .forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Subtle parallax on ambient orbs
  React.useEffect(() => {
    const orbs = document.querySelectorAll<HTMLElement>(".orb");
    if (!orbs.length) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        orbs.forEach((o, i) => {
          const speed = 0.06 + i * 0.04;
          o.style.transform = `translate3d(0, ${y * speed}px, 0)`;
        });
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Spotlight on service cards
  React.useEffect(() => {
    const cards = document.querySelectorAll<HTMLElement>(".service-card");
    const handlers: Array<[HTMLElement, (e: MouseEvent) => void]> = [];
    cards.forEach((card) => {
      const handler = (e: MouseEvent) => {
        const r = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${e.clientX - r.left}px`);
        card.style.setProperty("--my", `${e.clientY - r.top}px`);
      };
      card.addEventListener("mousemove", handler);
      handlers.push([card, handler]);
    });
    return () => handlers.forEach(([c, h]) => c.removeEventListener("mousemove", h));
  }, []);

  // (Hero metrics are qualitative text now — no count-up animation.)

  const logos = ["BEAUTY · COSMETICS", "TUTORING · EDTECH", "SOLOPRENEURS", "SMALL BUSINESS", "DTC BRANDS", "CREATORS"];
  const cases = [
    {
      tag: "Beauty · Brand site",
      img: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&q=80",
      metric: "Live in 3 weeks",
      desc: "From first call to launched storefront",
      name: "Indie Makeup Brand",
      body: "A modern, mobile-first website for a new makeup label — fast checkout, story-driven product pages, and a clean editorial feel.",
    },
    {
      tag: "Education · AI workflow",
      img: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80",
      metric: "24/7 tutoring",
      desc: "Automated, personalised, always-on",
      name: "AI Tutoring Service",
      body: "Our own AI-powered tutoring workflow — students get instant, tailored explanations and practice. Built end-to-end, running today.",
    },
  ];
  const stats = [
    { num: "1:1", label: "Founder-led work", desc: "You work directly with the maker — no handoffs." },
    { num: "2–4 wks", label: "From idea to live", desc: "Most projects ship within a month." },
    { num: "Fixed", label: "Honest pricing", desc: "Clear scope, flat fee. No hourly surprises." },
    { num: "AI-first", label: "Modern stack", desc: "Next.js, AI workflows, automation where it helps." },
  ];
  const audiences = [
    { h: "Beauty & Lifestyle Brands", p: "A modern, story-driven storefront that actually feels like your brand." },
    { h: "Tutors & Educators", p: "AI tools to scale yourself — handle more students without burning out." },
    { h: "Solopreneurs", p: "A clean site, an inbox automation, an AI assistant — done in weeks, not months." },
    { h: "Small Businesses", p: "Replace clunky old sites and manual processes with something modern and AI-aware." },
  ];
  const process = [
    { n: "01 — CHAT", h: "Free 20-min call", p: "Tell me what you’re building. I’ll tell you honestly if I can help — and what it’d cost." },
    { n: "02 — SCOPE", h: "Fixed quote in 48 hrs", p: "A short plan with a flat price and a date you can hold me to. No surprises." },
    { n: "03 — BUILD", h: "Shipped in 2–4 weeks", p: "Daily updates while I build. You see progress live, not at the end." },
    { n: "04 — SUPPORT", h: "30 days included", p: "I stick around after launch to tweak, fix, and help you get going." },
  ];
  const insights = [
    { img: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&q=80", cat: "Brand sites", read: "4 min read", title: "Why your indie brand needs more than a Shopify theme", desc: "The small design choices that make a new label feel premium instead of generic." },
    { img: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80", cat: "AI tutoring", read: "6 min read", title: "How I built a 24/7 AI tutor that actually helps", desc: "Behind the scenes of the AI workflow powering Amplixia’s tutoring service." },
    { img: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80", cat: "Automation", read: "5 min read", title: "5 quick AI automations for small teams", desc: "Tiny workflows that save real hours — email triage, content drafts, lead replies." },
  ];

  return (
    <div className="amplixia-landing">
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      <nav className="nav" id="nav">
        <div className="container nav-inner">
          <a href="#" className="logo" onClick={() => setMobileOpen(false)} aria-label="Amplixia">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.svg" alt="Amplixia" className="logo-img" />
          </a>
          <ul className="nav-links">
            <li><a href="#work">Work</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#process">Process</a></li>
            <li><a href="#insights">Insights</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
          <a href="#contact" className="btn btn-primary nav-cta-desktop">
            Book a call <span className="btn-arrow">→</span>
          </a>
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
          <li><a href="#work"     onClick={() => setMobileOpen(false)}>Work</a></li>
          <li><a href="#services" onClick={() => setMobileOpen(false)}>Services</a></li>
          <li><a href="#process"  onClick={() => setMobileOpen(false)}>Process</a></li>
          <li><a href="#insights" onClick={() => setMobileOpen(false)}>Insights</a></li>
          <li><a href="#contact"  onClick={() => setMobileOpen(false)}>Contact</a></li>
        </ul>
        <a
          href="#contact"
          className="btn btn-primary mobile-cta"
          onClick={() => setMobileOpen(false)}
        >
          Book a call <span className="btn-arrow">→</span>
        </a>
        <div className="mobile-menu-foot">
          <a href="mailto:hello@amplixia.ai">hello@amplixia.ai</a>
        </div>
      </div>
      <div
        className={`mobile-backdrop ${mobileOpen ? "is-open" : ""}`}
        onClick={() => setMobileOpen(false)}
        aria-hidden="true"
      />

      <header className="hero">
        <div className="container hero-content">
          <h1 className="hero-h1">
            <span className="word">Modern</span>{" "}
            <span className="word">brands.</span>
            <br />
            <span className="word"><span className="serif-italic">Smarter</span></span>{" "}
            <span className="word">learning.</span>
            <br />
            <span className="word">Built</span>{" "}
            <span className="word">with</span>{" "}
            <span className="word accent-word"><span className="accent">AI.</span></span>
          </h1>
          <p className="hero-sub fade-up">
            A small studio building beautiful brand websites and AI-powered tutoring tools. Founder-led, hands-on, shipped in weeks.
          </p>
          <div className="hero-cta fade-up">
            <a href="#contact" className="btn btn-primary">Start a project <span className="btn-arrow">→</span></a>
            <a href="#work" className="btn btn-ghost">See our work</a>
          </div>
          <div className="hero-meta">
            <div className="hero-meta-item"><div className="num">Founder-led</div><div className="desc">Direct work with the maker — no agency layers</div></div>
            <div className="hero-meta-item"><div className="num">2–4 weeks</div><div className="desc">From first call to a live site or workflow</div></div>
            <div className="hero-meta-item"><div className="num">AI-native</div><div className="desc">Modern tooling, automated where it matters</div></div>
          </div>
        </div>
      </header>

      <section className="marquee-section">
        <div className="container">
          <div className="marquee-label">Built for emerging brands &amp; modern learners</div>
        </div>
        <div className="marquee">
          <div className="marquee-track">
            {logos.concat(logos).map((name, i) => (
              <div className="marquee-item" key={i}>{name}</div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "3rem 0 4rem" }}>
        <div className="container">
          <div className="testimonial reveal">
            <p className="testimonial-quote">
              &ldquo;Sadbhav rebuilt our makeup brand site from scratch — it looks beautiful, loads instantly, and our launch week traffic actually converted. Couldn&apos;t recommend more.&rdquo;
            </p>
            <div className="testimonial-author">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="testimonial-avatar" src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&h=200&fit=crop" alt="Founder" />
              <div style={{ textAlign: "left" }}>
                <div className="testimonial-name">Brand Founder</div>
                <div className="testimonial-role">Indie Makeup Label · 2025</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="work">
        <div className="container">
          <div className="section-head reveal">
            <span className="label">Recent work</span>
            <h2>What we&apos;ve shipped so far.</h2>
            <p>A small slate of projects — but each one done carefully, end to end.</p>
          </div>
          <div className="cases-grid reveal-stagger">
            {cases.map((c, i) => (
              <div className="case-card" style={{ ["--i" as string]: i } as React.CSSProperties} key={i}>
                <div className="case-img">
                  <span className="case-tag">{c.tag}</span>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={c.img} alt="" />
                </div>
                <div className="case-body">
                  <div className="case-metric">{c.metric}</div>
                  <div className="case-metric-desc">{c.desc}</div>
                  <h3>{c.name}</h3>
                  <p className="case-desc">{c.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="services">
        <div className="container">
          <div className="section-head reveal">
            <span className="label">What we do</span>
            <h2>Three ways we can help.</h2>
            <p>Pick one, or combine them. Every project is hands-on and shipped quickly.</p>
          </div>
          <div className="services-grid reveal-stagger">
            <div className="service-card" style={{ ["--i" as string]: 0 } as React.CSSProperties}>
              <div className="service-num">01 / BRAND SITES</div>
              <div className="service-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" /></svg>
              </div>
              <h3>Brand Websites</h3>
              <p>Beautiful, fast, conversion-focused sites for indie brands and small businesses.</p>
              <ul>
                <li>Editorial design</li>
                <li>Mobile-first &amp; SEO ready</li>
                <li>Live in 2–4 weeks</li>
              </ul>
            </div>
            <div className="service-card" style={{ ["--i" as string]: 1 } as React.CSSProperties}>
              <div className="service-num">02 / AI TUTORING</div>
              <div className="service-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" /></svg>
              </div>
              <h3>AI Tutoring</h3>
              <p>An automated AI workflow that gives students personalised explanations &amp; practice 24/7.</p>
              <ul>
                <li>Subject-aware tutoring</li>
                <li>Instant feedback</li>
                <li>Parent-friendly progress</li>
              </ul>
            </div>
            <div className="service-card" style={{ ["--i" as string]: 2 } as React.CSSProperties}>
              <div className="service-num">03 / AUTOMATION</div>
              <div className="service-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1.1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z" /></svg>
              </div>
              <h3>AI Automation</h3>
              <p>Small automations that quietly save your team hours every week — emails, content, ops.</p>
              <ul>
                <li>Workflow design</li>
                <li>Custom AI prompts</li>
                <li>Plug-in to your tools</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="why">
        <div className="container">
          <div className="why-grid">
            <div className="why-text reveal-left">
              <span className="label">Why Amplixia</span>
              <h2 style={{ marginTop: "1.5rem" }}>A small studio, <span className="serif-italic">built to ship.</span></h2>
              <p>Amplixia is an early-stage studio. Right now it&apos;s a founder and a focused craft: build modern brand sites and useful AI tools — quickly, carefully, and without the agency markup.</p>
              <p className="why-pullquote">
                &ldquo;Big enough to ship serious work. Small enough that the person you talk to is the one building it.&rdquo;
                <span className="why-pullquote-attr">— Sadbhav Kattel, Founder</span>
              </p>
            </div>
            <div className="why-stats reveal-stagger reveal-right">
              {stats.map((s, i) => (
                <div className="stat-card" style={{ ["--i" as string]: i } as React.CSSProperties} key={i}>
                  <div className="stat-num">{s.num}</div>
                  <div className="stat-label">{s.label}</div>
                  <div className="stat-desc">{s.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="audience">
        <div className="container">
          <div className="section-head reveal">
            <span className="label">Who we work with</span>
            <h2>Built for the people we like working with.</h2>
          </div>
          <div className="audience-grid reveal-stagger">
            {audiences.map((a, i) => (
              <div className="audience-card" style={{ ["--i" as string]: i } as React.CSSProperties} key={i}>
                <h4>{a.h}</h4>
                <p>{a.p}</p>
                <span className="audience-arrow">→</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="process">
        <div className="container">
          <div className="section-head reveal">
            <span className="label">Process</span>
            <h2>How a project runs.</h2>
          </div>
          <div className="process-grid reveal-stagger">
            {process.map((s, i) => (
              <div className="process-step" style={{ ["--i" as string]: i } as React.CSSProperties} key={i}>
                <div className="process-num">{s.n}</div>
                <h4>{s.h}</h4>
                <p>{s.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="insights">
        <div className="container">
          <div className="section-head reveal">
            <span className="label">Insights</span>
            <h2>From the lab.</h2>
          </div>
          <div className="insights-grid reveal-stagger">
            {insights.map((a, i) => (
              <article className="insight-card" style={{ ["--i" as string]: i } as React.CSSProperties} key={i}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <div className="insight-img"><img src={a.img} alt="" /></div>
                <div className="insight-body">
                  <div className="insight-meta"><span>{a.cat}</span><span>{a.read}</span></div>
                  <h4>{a.title}</h4>
                  <p>{a.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "1rem 0 0" }}>
        <div className="container">
          <div className="wordmark">AMPLIXIA</div>
        </div>
      </section>

      <section id="contact" style={{ padding: "2rem 0 5rem" }}>
        <div className="container">
          <div className="cta-section reveal">
            <span className="label">Let&apos;s talk</span>
            <h2>Got an idea? <span className="accent">Let&apos;s build it.</span></h2>
            <p>A free 20-minute call. No pressure, no pitch deck — just a quick chat.</p>
            <div className="cta-buttons">
              <a href="mailto:hello@amplixia.ai" className="btn btn-primary">Email me <span className="btn-arrow">→</span></a>
              <a href="#work" className="btn btn-ghost">See the work first</a>
            </div>
          </div>
        </div>
      </section>

      <footer className="landing-footer">
        <div className="container">
          <div className="footer-top">
            <div className="footer-brand">
              <a href="#" className="logo" aria-label="Amplixia">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/logo.svg" alt="Amplixia" className="logo-img" />
              </a>
              <p>A small studio building modern brand sites and AI-powered tools.</p>
              <form
                className="newsletter"
                onSubmit={(e) => {
                  e.preventDefault();
                  const form = e.currentTarget;
                  const input = form.querySelector("input") as HTMLInputElement;
                  const btn = form.querySelector("button") as HTMLButtonElement;
                  input.value = "";
                  btn.innerText = "Subscribed ✓";
                }}
              >
                <input type="email" placeholder="your@email.com" required />
                <button type="submit">Subscribe</button>
              </form>
            </div>
            <div className="footer-cols">
              <div className="footer-col">
                <h4>Services</h4>
                <ul>
                  <li><a href="#services">Brand Websites</a></li>
                  <li><a href="#services">AI Tutoring</a></li>
                  <li><a href="#services">AI Automation</a></li>
                </ul>
              </div>
              <div className="footer-col">
                <h4>Studio</h4>
                <ul>
                  <li><a href="#why">About</a></li>
                  <li><a href="#work">Work</a></li>
                  <li><a href="#process">Process</a></li>
                  <li><a href="#insights">Notes</a></li>
                </ul>
              </div>
              <div className="footer-col">
                <h4>Connect</h4>
                <ul>
                  <li><a href="mailto:hello@amplixia.ai">hello@amplixia.ai</a></li>
                  <li><a href="#contact">Start a project</a></li>
                  <li><a href="#" aria-label="Twitter">Twitter</a></li>
                  <li><a href="#" aria-label="LinkedIn">LinkedIn</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} Amplixia AI, Inc. All rights reserved.</span>
            <div className="footer-social">
              <a href="#" aria-label="Twitter"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg></a>
              <a href="#" aria-label="LinkedIn"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg></a>
              <a href="#" aria-label="GitHub"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg></a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
