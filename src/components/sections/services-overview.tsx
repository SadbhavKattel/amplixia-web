import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/section";
import { RevealStagger, RevealItem } from "@/components/motion/reveal";
import { services } from "@/content/services";

export function ServicesOverview() {
  const featured = services.slice(0, 6);

  return (
    <Section id="services" className="border-b border-border">
      <SectionHeader eyebrow="What we do" title="Our services" />

      <RevealStagger
        as="ul"
        className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-2 lg:grid-cols-3"
      >
        {featured.map((service) => {
          const Icon = service.icon;
          return (
            <RevealItem as="li" key={service.slug} className="bg-bg-elevated">
              <Link
                href={`/services/${service.slug}`}
                className="group flex h-full flex-col p-7 transition-colors hover:bg-bg-subtle"
              >
                <div className="flex items-center justify-between">
                  <Icon className="h-5 w-5 text-accent" strokeWidth={1.6} />
                  <ArrowUpRight className="h-4 w-4 text-fg-subtle transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg" />
                </div>
                <h3 className="mt-7 text-base font-semibold tracking-tight text-fg">
                  {service.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-fg-muted">{service.short}</p>
              </Link>
            </RevealItem>
          );
        })}
      </RevealStagger>

      <div className="mt-8 flex justify-center">
        <Link
          href="/services"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-fg hover:text-accent"
        >
          See all services
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    </Section>
  );
}
