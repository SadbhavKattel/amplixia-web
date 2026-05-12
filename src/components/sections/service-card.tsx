"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  Bot,
  Globe2,
  Image as ImageIcon,
  Layers,
  Megaphone,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { useReducedMotion } from "framer-motion";
import * as React from "react";

interface ServiceCardData {
  slug: string;
  name: string;
  short: string;
  iconKey: string;
}

const ICONS: Record<string, LucideIcon> = {
  "ai-creative": ImageIcon,
  "paid-ads": Megaphone,
  "ai-automation": Workflow,
  "ai-agents": Bot,
  "saas-development": Layers,
  "web-development": Globe2,
};

export default function ServiceCard({ service }: { service: ServiceCardData }) {
  const reduce = useReducedMotion();

  function handlePointerMove(e: React.PointerEvent) {
    if (reduce) return;
    // only respond to mouse/pen to avoid interfering with touch
    if (e.pointerType === "touch") return;
    const el = e.currentTarget as HTMLElement;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotX = ((y - cy) / cy) * 6; // max 6deg
    const rotY = ((x - cx) / cx) * -6;
    el.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.02)`;
    el.style.transition = "transform 120ms linear";
  }

  function handlePointerLeave(e: React.PointerEvent) {
    if (reduce) return;
    const el = e.currentTarget as HTMLElement;
    el.style.transform = "none";
    el.style.transition = "transform 300ms ease";
  }

  const Icon = ICONS[service.iconKey] ?? Layers;

  return (
    <Link href={`/services/${service.slug}`} className="group block h-full">
      <div
        className="rounded-lg p-7 transition-shadow will-change-transform bg-bg-elevated shadow-sm hover:shadow-lg"
        onPointerMove={reduce ? undefined : handlePointerMove}
        onPointerLeave={reduce ? undefined : handlePointerLeave}
      >
        <div className="flex items-center justify-between">
          <Icon className="h-5 w-5 text-accent" strokeWidth={1.6} />
          <ArrowUpRight className="h-4 w-4 text-fg-subtle transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg" />
        </div>
        <h3 className="mt-7 text-base font-semibold tracking-tight text-fg">{service.name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-fg-muted">{service.short}</p>
      </div>
    </Link>
  );
}
