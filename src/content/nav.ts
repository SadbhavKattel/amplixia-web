export const primaryNav = [
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export const footerNav = {
  Services: [
    { label: "AI Creative", href: "/services/ai-creative" },
    { label: "Paid Ads", href: "/services/paid-ads" },
    { label: "AI Automation", href: "/services/ai-automation" },
    { label: "AI Agents", href: "/services/ai-agents" },
    { label: "Web & Mobile", href: "/services/web-development" },
    { label: "All services", href: "/services" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact" },
  ],
  Legal: [
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
  ],
} as const;
