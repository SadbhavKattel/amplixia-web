import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Dot } from "@/components/ui/badge";
import { Reveal } from "@/components/motion/reveal";

export function Hero() {
  return (
    <section className="relative border-b border-border grain overflow-hidden">
      <div aria-hidden className="absolute inset-0 cool-glow" />
      <div className="container relative pt-24 pb-20 sm:pt-32 sm:pb-28">
        <Reveal className="max-w-4xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-bg-elevated/70 px-3 py-1 text-xs text-fg-muted backdrop-blur">
            <Dot />
            <span>Open for new projects</span>
          </div>

          <h1 className="mt-7 text-display-2xl font-normal">
            We help businesses <span className="font-serif italic font-medium text-accent">grow with AI</span>.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-fg-muted sm:text-xl">
            Marketing, ad creative, websites, software, automation. We pick up whichever
            piece you need help with, and we do it well.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/contact" size="lg">
              Get in touch
              <ArrowRight className="h-4 w-4" />
            </ButtonLink>
            <ButtonLink href="/services" size="lg" variant="secondary">
              See what we do
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
