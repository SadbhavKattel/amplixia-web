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

  // Reveal on scroll
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
      { threshold: 0.08 },
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
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

  // Hero metric count-ups
  React.useEffect(() => {
    const items = document.querySelectorAll<HTMLElement>(".hero-meta-item .num");
    function countUp(el: HTMLElement, target: number, suffix = "", duration = 1400) {
      const start = performance.now();
      const step = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 3);
        el.textContent = Math.floor(target * eased) + suffix;
        if (t < 1) requestAnimationFrame(step);
        else el.textContent = target + suffix;
      };
      requestAnimationFrame(step);
    }
    if (items[0]) countUp(items[0], 50, "+");
    if (items[1]) {
      const el = items[1];
      const start = performance.now();
      const step = (now: number) => {
        const t = Math.min(1, (now - start) / 1400);
        const eased = 1 - Math.pow(1 - t, 3);
        el.textContent = "$" + Math.floor(120 * eased) + "M+";
        if (t < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }
  }, []);

  const logos = ["NEXUS", "QUANTA", "ORBIT LABS", "VERTEX", "PRISM", "HELIOS", "AZIMUTH", "SOLARA", "CARBON·9", "FERMI"];
  const cases = [
    { tag: "Aviation", img: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80", metric: "$6M / week", desc: "Revenue unlocked through dynamic pricing AI", name: "Vertex Aviation", body: "Real-time pricing engine trained on 12 years of route data. Deployed across 40 carriers." },
    { tag: "Healthcare", img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80", metric: "90% reduction", desc: "In manual chart review overhead", name: "Helios Medical", body: "Multimodal AI pipeline for radiology triage. Now processing 200K scans/month." },
    { tag: "Edtech", img: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80", metric: "Top 1–2%", desc: "Student outcomes vs. national benchmark", name: "Quanta Learning", body: "Personalized tutoring agents across math and reading, K–12. Now serving 1.2M students." },
    { tag: "Manufacturing", img: "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=800&q=80", metric: "$18M / year", desc: "Saved through predictive maintenance", name: "Carbon·9 Industries", body: "Anomaly-detection models running on 2,400 sensors across 14 plants." },
  ];
  const stats = [
    { num: "80+", label: "PhD-level engineers", desc: "Researchers from DeepMind, OpenAI, Stanford, MIT." },
    { num: "12 wks", label: "To production", desc: "From kickoff to a live, scaling AI system." },
    { num: "98%", label: "Client retention", desc: "Renewals and expansions year over year." },
    { num: "$120M+", label: "Revenue accelerated", desc: "Measured impact across client portfolios." },
  ];
  const audiences = [
    { h: "Enterprise", p: "Embedded teams to ship AI at scale across F500 orgs." },
    { h: "PE & Portfolios", p: "AI value-creation playbooks across portfolio companies." },
    { h: "Mid-market", p: "End-to-end builds with measurable ROI in one quarter." },
    { h: "Startups", p: "Founder-mode partners for seed to Series B AI-native teams." },
  ];
  const process = [
    { n: "01 — DISCOVER", h: "Two-week sprint", p: "We embed, map your data, and define what success means in dollars and days." },
    { n: "02 — PROTOTYPE", h: "Working POC in 4 weeks", p: "An end-to-end prototype that proves the core hypothesis, not just a demo." },
    { n: "03 — SHIP", h: "Production in 12 weeks", p: "Hardened, evaluated, observable. Deployed to your infra or ours." },
    { n: "04 — SCALE", h: "Continuous evolution", p: "We stay on as embedded partners — measuring, iterating, expanding." },
  ];
  const insights = [
    { img: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80", cat: "Research", read: "5 min read", title: "Ten lessons from a decade of applied AI", desc: "What we've learned shipping models into the wild — and what we'd never do again." },
    { img: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80", cat: "Engineering", read: "8 min read", title: "Evals are a moat. Here's why.", desc: "Why the teams winning the AI race are the ones obsessed with evaluation infra." },
    { img: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80", cat: "Strategy", read: "6 min read", title: "The AI readiness gap", desc: "Most enterprises aren't model-limited. They're data-, ops-, and culture-limited." },
  ];

  return (
    <div className="amplixia-landing">
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      <nav className="nav" id="nav">
        <div className="container nav-inner">
          <a href="#" className="logo" onClick={() => setMobileOpen(false)}>
            <span className="logo-dot" />
            Amplixia
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
            <span className="word">We</span>{" "}
            <span className="word">solve</span>{" "}
            <span className="word"><span className="serif-italic">hard</span></span>{" "}
            <span className="word">problems</span>
            <br />
            <span className="word">with</span>{" "}
            <span className="word accent-word"><span className="accent">frontier</span></span>{" "}
            <span className="word accent-word"><span className="accent">AI.</span></span>
          </h1>
          <p className="hero-sub fade-up">
            Strategy, automation, and production AI systems — shipped in weeks, not quarters. Built by scientists, engineered for scale.
          </p>
          <div className="hero-cta fade-up">
            <a href="#contact" className="btn btn-primary">Bring us your problem <span className="btn-arrow">→</span></a>
            <a href="#work" className="btn btn-ghost">See the work</a>
          </div>
          <div className="hero-meta">
            <div className="hero-meta-item"><div className="num">50+</div><div className="desc">Production AI systems shipped</div></div>
            <div className="hero-meta-item"><div className="num">$120M+</div><div className="desc">Client revenue accelerated</div></div>
            <div className="hero-meta-item"><div className="num">12 wks</div><div className="desc">Avg. time to production</div></div>
          </div>
        </div>
      </header>

      <section className="marquee-section">
        <div className="container">
          <div className="marquee-label">Trusted by category leaders worldwide</div>
        </div>
        <div className="marquee">
          <div className="marquee-track">
            {logos.concat(logos).map((name, i) => (
              <div className="marquee-item" key={i}>{name}</div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "5rem 0" }}>
        <div className="container">
          <div className="testimonial reveal">
            <p className="testimonial-quote">
              &ldquo;Amplixia is our secret weapon. They shipped a production AI system in six weeks that our internal team couldn&apos;t deliver in a year.&rdquo;
            </p>
            <div className="testimonial-author">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="testimonial-avatar" src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop" alt="Sarah Chen" />
              <div style={{ textAlign: "left" }}>
                <div className="testimonial-name">Sarah Chen</div>
                <div className="testimonial-role">VP of Product, Vertex Aviation</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="work">
        <div className="container">
          <div className="section-head reveal">
            <span className="label">Recent work</span>
            <h2>Outcomes over output.</h2>
            <p>We measure ourselves by what we ship, and what it earns for our clients.</p>
          </div>
          <div className="cases-grid">
            {cases.map((c, i) => (
              <div className="case-card reveal" key={i}>
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
            <span className="label">How we work</span>
            <h2>Three ways in.</h2>
            <p>Most engagements start small — a strategy sprint or a proof of concept. Then we scale what works.</p>
          </div>
          <div className="services-grid">
            <div className="service-card reveal">
              <div className="service-num">01 / STRATEGY</div>
              <div className="service-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
              </div>
              <h3>AI Strategy</h3>
              <p>Where can AI move the needle? We tell you in 2 weeks.</p>
              <ul>
                <li>Readiness assessments</li>
                <li>Opportunity sizing</li>
                <li>Org &amp; data design</li>
              </ul>
            </div>
            <div className="service-card reveal">
              <div className="service-num">02 / BUILD</div>
              <div className="service-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>
              </div>
              <h3>Production AI</h3>
              <p>Custom agents, RAG systems, and fine-tuned models — shipped to prod in weeks.</p>
              <ul>
                <li>Custom agents &amp; workflows</li>
                <li>Fine-tuned models</li>
                <li>Full-stack AI products</li>
              </ul>
            </div>
            <div className="service-card reveal">
              <div className="service-num">03 / RESEARCH</div>
              <div className="service-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
              </div>
              <h3>Applied Research</h3>
              <p>Frontier R&amp;D for problems no off-the-shelf model can solve.</p>
              <ul>
                <li>Novel architectures</li>
                <li>Alignment &amp; evaluation</li>
                <li>Multimodal systems</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="why">
        <div className="container">
          <div className="why-grid">
            <div className="why-text reveal">
              <span className="label">Why Amplixia</span>
              <h2 style={{ marginTop: "1.5rem" }}>Scientists <span className="serif-italic">who ship.</span></h2>
              <p>We&apos;re a bootstrapped team of 80 researchers and engineers. No middle management. No bloat. Founder-level mentality from day one.</p>
              <p className="why-pullquote">
                &ldquo;The most constructive version of AI alignment work I&apos;ve seen — they ship things that actually matter.&rdquo;
                <span className="why-pullquote-attr">— Emmett Shear, former CEO, OpenAI (interim)</span>
              </p>
            </div>
            <div className="why-stats reveal">
              {stats.map((s, i) => (
                <div className="stat-card" key={i}>
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
            <h2>From seed to S&amp;P 500.</h2>
          </div>
          <div className="audience-grid">
            {audiences.map((a, i) => (
              <div className="audience-card reveal" key={i}>
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
          <div className="process-grid">
            {process.map((s, i) => (
              <div className="process-step reveal" key={i}>
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
          <div className="insights-grid">
            {insights.map((a, i) => (
              <article className="insight-card reveal" key={i}>
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

      <section style={{ padding: "2rem 0 0" }}>
        <div className="container">
          <div className="wordmark">AMPLIXIA</div>
        </div>
      </section>

      <section id="contact" style={{ padding: "4rem 0 7rem" }}>
        <div className="container">
          <div className="cta-section reveal">
            <span className="label">Let&apos;s build</span>
            <h2>Bring us the <span className="accent">hard</span> problem.</h2>
            <p>30-minute strategy call. No pitch deck — just answers.</p>
            <div className="cta-buttons">
              <a href="mailto:hello@amplixia.ai" className="btn btn-primary">Book a call <span className="btn-arrow">→</span></a>
              <a href="#work" className="btn btn-ghost">See the work first</a>
            </div>
          </div>
        </div>
      </section>

      <footer className="landing-footer">
        <div className="container">
          <div className="footer-top">
            <div className="footer-brand">
              <a href="#" className="logo"><span className="logo-dot" />Amplixia</a>
              <p>Scientists who ship. Frontier AI for ambitious teams.</p>
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
                  <li><a href="#services">AI Strategy</a></li>
                  <li><a href="#services">Production AI</a></li>
                  <li><a href="#services">Applied Research</a></li>
                  <li><a href="#audience">For Enterprise</a></li>
                </ul>
              </div>
              <div className="footer-col">
                <h4>Company</h4>
                <ul>
                  <li><a href="#why">About</a></li>
                  <li><a href="#work">Case studies</a></li>
                  <li><a href="#insights">Insights</a></li>
                  <li><a href="/careers">Careers</a></li>
                </ul>
              </div>
              <div className="footer-col">
                <h4>Resources</h4>
                <ul>
                  <li><a href="#">AI Readiness Quiz</a></li>
                  <li><a href="#">Whitepapers</a></li>
                  <li><a href="#">Newsletter</a></li>
                  <li><a href="#">Press kit</a></li>
                </ul>
              </div>
              <div className="footer-col">
                <h4>Contact</h4>
                <ul>
                  <li><a href="mailto:hello@amplixia.ai">hello@amplixia.ai</a></li>
                  <li><a href="#">San Francisco</a></li>
                  <li><a href="#">London</a></li>
                  <li><a href="#">Singapore</a></li>
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
