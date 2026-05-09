import type { Metadata } from "next";
import { Eyebrow } from "@/components/ui/section";
import { ContactForm } from "@/components/forms/contact-form";
import { Reveal } from "@/components/motion/reveal";
import { pageMetadata, siteConfig } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description: "Send us a message. We reply within one business day.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <section>
      <div className="container grid gap-12 py-20 lg:grid-cols-[1fr,1.4fr] lg:py-24">
        <Reveal className="lg:sticky lg:top-24 lg:self-start">
          <Eyebrow>Contact</Eyebrow>
          <h1 className="mt-4 text-display-lg font-semibold">
            Tell us about your project.
          </h1>
          <p className="mt-5 text-[15px] leading-relaxed text-fg-muted">
            We read every message and reply within one business day. If we're not the
            right fit, we'll say so.
          </p>
          <div className="mt-8 space-y-4 text-sm">
            <div>
              <div className="font-mono text-xs uppercase tracking-[0.14em] text-fg-subtle">
                Email
              </div>
              <a
                href={`mailto:${siteConfig.email}`}
                className="mt-1 inline-block text-fg hover:text-accent"
              >
                {siteConfig.email}
              </a>
            </div>
            <div>
              <div className="font-mono text-xs uppercase tracking-[0.14em] text-fg-subtle">
                Reply time
              </div>
              <div className="mt-1 text-fg-muted">Within one business day.</div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}
