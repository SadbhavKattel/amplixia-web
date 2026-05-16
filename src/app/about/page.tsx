import type { Metadata } from "next";
import { Eyebrow } from "@/components/ui/section";
import { CTA } from "@/components/sections/cta";
import { Reveal, RevealStagger, RevealItem } from "@/components/motion/reveal";
import { pageMetadata, siteConfig } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description: "About Amplixia.",
  path: "/about",
});

const principles = [
  { title: "We're hands-on.", body: "The same people who scope the work also do it." },
  { title: "We say no.", body: "If a project isn't a fit, or AI isn't the answer, we'll tell you." },
  { title: "Outcomes matter.", body: "We care about what changes for your business, not the deck." },
  { title: "No tool lock-in.", body: "We pick what fits, not what we get a kickback on." },
];

export default function AboutPage() {
  return (
    <>
      <section className="border-b border-border">
        <div className="container py-20 sm:py-24">
          <Reveal className="max-w-3xl">
            <Eyebrow>About</Eyebrow>
            <h1 className="mt-5 text-display-xl font-semibold">
              Small team. Real work.
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-fg-muted">
              {siteConfig.legalName} is a small group of engineers, designers, and
              marketers who help businesses get more out of AI. We do the building, we
              do the running, and we stick around long enough to see if it worked.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-fg-muted">
              We work with founders, ops leads, and marketing teams who want to ship
              real things, not pilot programmes.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="border-b border-border bg-bg-subtle">
        <div className="container py-20">
          <Eyebrow>How we work</Eyebrow>
          <h2 className="mt-4 text-display-md font-semibold">A few things we believe</h2>
          <RevealStagger
            as="ul"
            className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2"
          >
            {principles.map((p, i) => (
              <RevealItem as="li" key={p.title} className="flex gap-5">
                <span aria-hidden className="font-mono text-xs text-accent pt-1 shrink-0 w-6">
                  0{i + 1}
                </span>
                <div>
                  <h3 className="text-lg font-semibold tracking-tight text-fg">{p.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-fg-muted">{p.body}</p>
                </div>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </section>

      <CTA />
    </>
  );
}
