import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Eyebrow } from "@/components/ui/section";
import { CTA } from "@/components/sections/cta";
import { RevealStagger, RevealItem, Reveal } from "@/components/motion/reveal";
import { services } from "@/content/services";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Services",
  description: "AI creative, paid ads, automation, agents, software, consulting, data, integrations.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <section className="border-b border-border">
        <div className="container py-20 sm:py-24">
          <Reveal>
            <Eyebrow>Services</Eyebrow>
            <h1 className="mt-5 max-w-3xl text-display-xl font-semibold">
              What we do
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-fg-muted">
              Click any service for details. If your project covers more than one,
              just get in touch.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="border-b border-border">
        <RevealStagger
          as="ul"
          className="container grid gap-px overflow-hidden border-x border-border bg-border md:grid-cols-2 lg:grid-cols-3 px-0"
          stagger={0.04}
        >
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <RevealItem as="li" key={service.slug} className="bg-bg">
                <Link
                  href={`/services/${service.slug}`}
                  className="group flex h-full flex-col p-7 transition-colors hover:bg-bg-subtle"
                >
                  <div className="flex items-center justify-between">
                    <Icon className="h-5 w-5 text-accent" strokeWidth={1.6} />
                    <ArrowUpRight className="h-4 w-4 text-fg-subtle transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg" />
                  </div>
                  <h2 className="mt-7 text-base font-semibold tracking-tight text-fg">
                    {service.name}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-fg-muted">{service.short}</p>
                </Link>
              </RevealItem>
            );
          })}
        </RevealStagger>
      </section>

      <CTA />
    </>
  );
}
