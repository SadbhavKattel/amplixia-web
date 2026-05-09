import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/section";
import { CTA } from "@/components/sections/cta";
import { Reveal, RevealStagger, RevealItem } from "@/components/motion/reveal";
import { services, servicesBySlug } from "@/content/services";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = servicesBySlug[slug];
  if (!service) return pageMetadata({ title: "Service not found", noIndex: true });
  return pageMetadata({
    title: service.name,
    description: service.short,
    path: `/services/${slug}`,
  });
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = servicesBySlug[slug];
  if (!service) notFound();

  const Icon = service.icon;

  return (
    <>
      <section className="border-b border-border">
        <div className="container py-16 sm:py-20">
          <Link href="/services" className="text-sm text-fg-muted hover:text-accent">
            ← All services
          </Link>
          <Reveal className="mt-8 flex items-start gap-5">
            <div className="hidden sm:grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-border text-accent">
              <Icon className="h-6 w-6" strokeWidth={1.6} />
            </div>
            <div>
              <Eyebrow>Service</Eyebrow>
              <h1 className="mt-4 text-display-xl font-semibold max-w-3xl">
                {service.name}
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-fg-muted">
                {service.summary}
              </p>
              <div className="mt-8">
                <ButtonLink href="/contact">
                  Talk to us <ArrowRight className="h-4 w-4" />
                </ButtonLink>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-b border-border bg-bg-subtle">
        <div className="container grid gap-12 py-16 lg:grid-cols-2">
          <Reveal>
            <Eyebrow>What you get</Eyebrow>
            <h2 className="mt-4 text-display-md font-semibold">Why teams hire us for this</h2>
            <ul className="mt-6 space-y-3">
              {service.outcomes.map((o) => (
                <li key={o} className="flex items-start gap-3 text-[15px] text-fg">
                  <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent-muted text-accent">
                    <Check className="h-3 w-3" strokeWidth={2.5} />
                  </span>
                  {o}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.05}>
            <Eyebrow>What's included</Eyebrow>
            <h2 className="mt-4 text-display-md font-semibold">The work itself</h2>
            <ul className="mt-6 grid gap-2 sm:grid-cols-2">
              {service.capabilities.map((c) => (
                <li
                  key={c}
                  className="rounded-lg border border-border bg-bg-elevated px-4 py-2.5 text-sm text-fg"
                >
                  {c}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="container py-16">
          <Eyebrow>Tools</Eyebrow>
          <h2 className="mt-3 text-display-md font-semibold">What we usually use</h2>
          <RevealStagger as="ul" className="mt-8 flex flex-wrap gap-2" stagger={0.03}>
            {service.stack.map((s) => (
              <RevealItem
                as="li"
                key={s}
                className="rounded-full border border-border bg-bg-subtle px-3 py-1.5 text-xs font-mono text-fg"
              >
                {s}
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </section>

      <CTA />
    </>
  );
}
