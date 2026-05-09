import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";

export function CTA() {
  return (
    <section className="relative border-t border-border bg-bg-subtle grain overflow-hidden">
      <div aria-hidden className="absolute inset-0 cool-glow" />
      <div className="container relative py-24 sm:py-28">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-display-xl font-semibold">
            Got a <span className="font-serif italic font-medium text-accent">project</span> in mind?
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-fg-muted">
            Tell us what you're trying to do. We'll come back within a day with a plan,
            or a quick yes/no on whether we can help.
          </p>
          <div className="mt-10 flex justify-center">
            <ButtonLink href="/contact" size="lg">
              Get in touch
              <ArrowRight className="h-4 w-4" />
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
