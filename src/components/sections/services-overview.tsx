import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/section";
import { RevealStagger, RevealItem } from "@/components/motion/reveal";
import ServiceCard from "./service-card";
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
        {featured.map((service) => (
          <RevealItem as="li" key={service.slug} className="bg-bg-elevated">
            <ServiceCard
              service={{
                slug: service.slug,
                name: service.name,
                short: service.short,
                iconKey: service.slug,
              }}
            />
          </RevealItem>
        ))}
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
