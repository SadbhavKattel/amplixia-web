"use client";
import * as React from "react";
import "../landing.css";
import { LandingNav } from "@/components/layout/landing-nav";
import { LandingFooter } from "@/components/layout/landing-footer";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  return (
    <div className="amplixia-landing">
      <LandingNav />
      <section id="contact" style={{ padding: "8rem 0 5rem", minHeight: "80vh" }}>
        <div className="container">
          <div className="cta-section reveal visible">
            <span className="label">Let's talk</span>
            <h2>Got an idea? <span className="accent">Let's build it.</span></h2>
            <p>Tell us a bit about what you're looking for, and we'll get back to you with an honest answer.</p>
            <form
              className="contact-form"
              onSubmit={async (e) => {
                e.preventDefault();
                setIsSubmitting(true);
                setIsSubmitted(false);

                const form = e.currentTarget as HTMLFormElement;
                const name = (form.elements.namedItem("name") as HTMLInputElement).value;
                const email = (form.elements.namedItem("email") as HTMLInputElement).value;
                const business = (form.elements.namedItem("business") as HTMLInputElement).value;
                const details = (form.elements.namedItem("details") as HTMLTextAreaElement).value;
                const budget = (form.elements.namedItem("budget") as HTMLInputElement).value;

                try {
                  const res = await fetch("/api/contact", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ name, email, business, details, budget }),
                  });

                  if (res.ok) {
                    setIsSubmitted(true);
                    form.reset();
                    setTimeout(() => setIsSubmitted(false), 3000);
                  } else {
                    alert("Something went wrong. Please try again.");
                  }
                } catch {
                  alert("Failed to send message.");
                } finally {
                  setIsSubmitting(false);
                }
              }}
              style={{ maxWidth: "600px", margin: "2rem auto 0", textAlign: "left", display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <label htmlFor="name" style={{ fontSize: "0.9rem", color: "var(--text-dim)" }}>Your Name</label>
                <input id="name" name="name" type="text" required placeholder="John Doe" style={{ padding: "0.75rem", borderRadius: "0.5rem", border: "1px solid var(--border)", background: "rgba(255,255,255,0.03)", color: "var(--text)", width: "100%" }} />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <label htmlFor="email" style={{ fontSize: "0.9rem", color: "var(--text-dim)" }}>Your Email</label>
                <input id="email" name="email" type="email" required placeholder="you@example.com" style={{ padding: "0.75rem", borderRadius: "0.5rem", border: "1px solid var(--border)", background: "rgba(255,255,255,0.03)", color: "var(--text)", width: "100%" }} />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <label htmlFor="business" style={{ fontSize: "0.9rem", color: "var(--text-dim)" }}>Type of Business</label>
                <input id="business" name="business" type="text" required placeholder="e.g. Indie Makeup Brand, EdTech Startup" style={{ padding: "0.75rem", borderRadius: "0.5rem", border: "1px solid var(--border)", background: "rgba(255,255,255,0.03)", color: "var(--text)", width: "100%" }} />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <label htmlFor="details" style={{ fontSize: "0.9rem", color: "var(--text-dim)" }}>Project Details</label>
                <textarea id="details" name="details" required placeholder="Tell us what you're building..." rows={4} style={{ padding: "0.75rem", borderRadius: "0.5rem", border: "1px solid var(--border)", background: "rgba(255,255,255,0.03)", color: "var(--text)", width: "100%", resize: "vertical" }}></textarea>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <label htmlFor="budget" style={{ fontSize: "0.9rem", color: "var(--text-dim)" }}>Budget</label>
                <input id="budget" name="budget" type="text" required placeholder="What is your estimated budget?" style={{ padding: "0.75rem", borderRadius: "0.5rem", border: "1px solid var(--border)", background: "rgba(255,255,255,0.03)", color: "var(--text)", width: "100%" }} />
              </div>
              <button type="submit" disabled={isSubmitting || isSubmitted} className="btn btn-primary" style={{ marginTop: "1rem", alignSelf: "flex-start", opacity: (isSubmitting || isSubmitted) ? 0.7 : 1 }}>
                {isSubmitting ? "Sending..." : isSubmitted ? "Submitted ✓" : <><span style={{ marginRight: '0.2rem' }}>Submit</span> <span className="btn-arrow">→</span></>}
              </button>
            </form>
          </div>
        </div>
      </section>
      <LandingFooter />
    </div>
  );
}
