import { Section, SectionHeader } from "@/components/ui/section";
import { RevealStagger, RevealItem } from "@/components/motion/reveal";

const reasons = [
  {
    title: "We're engineers and operators.",
    body: "Same people who scope the work also write the code and run the campaigns.",
  },
  {
    title: "We say no.",
    body: "If a project isn't a fit or AI isn't the answer, we'll tell you.",
  },
  {
    title: "No tool lock-in.",
    body: "We pick what fits your project, not what we get a kickback on.",
  },
  {
    title: "You can see the work.",
    body: "Logs, metrics, weekly check-ins. Nothing hides in a black box.",
  },
];

export function WhyUs() {
  return (
    <Section id="why" className="border-b border-border bg-bg-subtle">
      <SectionHeader eyebrow="Why us" title="A few things we care about" />

      <RevealStagger
        as="ul"
        className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2"
      >
        {reasons.map(({ title, body }, i) => (
          <RevealItem as="li" key={title} className="flex gap-5">
            <span
              aria-hidden
              className="font-mono text-xs text-accent pt-1 shrink-0 w-6"
            >
              0{i + 1}
            </span>
            <div>
              <h3 className="text-lg font-semibold tracking-tight text-fg">{title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-fg-muted">{body}</p>
            </div>
          </RevealItem>
        ))}
      </RevealStagger>
    </Section>
  );
}
