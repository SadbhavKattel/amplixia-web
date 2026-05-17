"use client";

import * as React from "react";
import "./landing.css";
import { LandingNav } from "@/components/layout/landing-nav";
import { LandingFooter } from "@/components/layout/landing-footer";

export default function HomePage() {
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

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSubmitted, setIsSubmitted] = React.useState(false);

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
      body: "A modern, mobile-first website for a new makeup label with fast checkout, story-driven product pages, and a clean editorial feel.",
    },
    {
      tag: "Education · AI workflow",
      img: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80",
      metric: "24/7 tutoring",
      desc: "Automated, personalized, and always online",
      name: "AI Tutoring Service",
      body: "Our custom AI-powered tutoring workflow where students receive instant, tailored explanations and practice. We built it end-to-end and it is fully operational.",
    },
  ];
  const stats = [
    { num: "1:1", label: "Founder-led work", desc: "You work directly with the maker, no handoffs." },
    { num: "2-4 wks", label: "From idea to live", desc: "Most projects ship within a month." },
    { num: "Fixed", label: "Honest pricing", desc: "Clear scope, flat fee. No hourly surprises." },
    { num: "AI-first", label: "Modern stack", desc: "Next.js, AI workflows, automation where it helps." },
  ];
  const audiences = [
    { h: "Beauty & Lifestyle Brands", p: "A modern, story-driven storefront that actually feels like your brand." },
    { h: "Tutors & Educators", p: "AI tools to scale yourself and handle more students without burning out." },
    { h: "Solopreneurs", p: "A clean site, an inbox automation, an AI assistant, all done in weeks, not months." },
    { h: "Small Businesses", p: "Replace clunky old sites and manual processes with something modern and AI-aware." },
  ];
  const process = [
    { n: "01 / CHAT", h: "Free 20-min call", p: "Tell us what you're building. We'll give you an honest answer if we can help, and how much it will cost." },
    { n: "02 / SCOPE", h: "Fixed quote in 48 hrs", p: "A clear plan with a flat price and a reliable deadline. No surprises." },
    { n: "03 / BUILD", h: "Shipped in 2-4 weeks", p: "Daily updates while we build. You get to see the progress live, not just at the end." },
    { n: "04 / SUPPORT", h: "30 days included", p: "We stay involved after launch to tweak, fix, and help you get started." },
  ];
  const insights = [
    { img: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&q=80", cat: "Brand sites", read: "4-minute read", title: "Why Your Indie Brand Needs More Than a Shopify Theme", desc: "The small design choices that make a new label feel premium instead of generic.", link: "/blog/brand-sites" },
    { img: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80", cat: "AI tutoring", read: "6-minute read", title: "How We Built a 24/7 AI Tutor That Actually Helps", desc: "Behind the scenes of the AI workflow powering Amplixia's tutoring service.", link: "/blog/ai-tutoring" },
    { img: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80", cat: "Automation", read: "5-minute read", title: "5 Quick AI Automations for Small Teams", desc: "Small workflows that save real hours like email triage, content drafts, and lead replies.", link: "/blog/automation" },
  ];

  return (
    <div className="amplixia-landing">
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      <LandingNav />

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
            <a href="/contact" className="btn btn-primary">Start a project <span className="btn-arrow">→</span></a>
            <a href="#work" className="btn btn-ghost">See our work</a>
          </div>
          <div className="hero-meta">
            <div className="hero-meta-item"><div className="num">Founder-led</div><div className="desc">Direct work with the maker, no agency layers</div></div>
            <div className="hero-meta-item"><div className="num">2-4 weeks</div><div className="desc">From first call to a live site or workflow</div></div>
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
              &ldquo;Amplixia rebuilt our makeup brand site from scratch and it looks beautiful, loads instantly, and our launch week traffic actually converted. Couldn't recommend more.&rdquo;
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
            <h2>What we've shipped so far.</h2>
            <p>A small slate of projects, each one done carefully, end to end.</p>
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
                <li>Live in 2-4 weeks</li>
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
              <p>Small automations that quietly save your team hours every week across emails, content, and operations.</p>
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
              <p>Amplixia is an early-stage studio with a focused craft: build modern brand sites and useful AI tools quickly, carefully, and without the agency markup.</p>
              <p className="why-pullquote">
                &ldquo;Big enough to ship serious work. Small enough that the person you talk to is the one building it.&rdquo;
                <span className="why-pullquote-attr">- Our Brand Motto</span>
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
              <a href={a.link} className="insight-card" style={{ ["--i" as string]: i, display: "block", textDecoration: "none" } as React.CSSProperties} key={i}>
                <article>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <div className="insight-img"><img src={a.img} alt="" /></div>
                  <div className="insight-body">
                    <div className="insight-meta"><span>{a.cat}</span><span>{a.read}</span></div>
                    <h4>{a.title}</h4>
                    <p>{a.desc}</p>
                  </div>
                </article>
              </a>

            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "1rem 0 0" }}>
        <div className="container">
          <div className="wordmark">AMPLIXIA</div>
        </div>
      </section>


      <LandingFooter />
    </div>
  );
}
