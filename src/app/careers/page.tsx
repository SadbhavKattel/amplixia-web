import type { Metadata } from "next";
import { Eyebrow } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Careers",
  description: "Work with Amplixia.",
  path: "/careers",
});

export default function CareersPage() {
  return (
    <section>
      <div className="container py-20 sm:py-24 max-w-2xl">
        <Reveal>
          <Eyebrow>Careers</Eyebrow>
          <h1 className="mt-5 text-display-lg font-semibold">
            Want to work with us?
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-fg-muted">
            We're a small team and we hire when there's real work to do. If you write
            code, run ads, design, or manage projects and like the way we work, send
            us a note.
          </p>
          <div className="mt-8">
            <ButtonLink href="mailto:services@amplixia.com">services@amplixia.com</ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
