import type { LucideIcon } from "lucide-react";
import {
  Workflow,
  Bot,
  Image as ImageIcon,
  Megaphone,
  Mail,
  Layers,
  Globe2,
  LineChart,
  Plug,
  Sparkles,
  Cloud,
  Users,
} from "lucide-react";

export interface Service {
  slug: string;
  name: string;
  short: string;
  summary: string;
  icon: LucideIcon;
  outcomes: string[];
  capabilities: string[];
  stack: string[];
}

export const services: Service[] = [
  {
    slug: "ai-creative",
    name: "AI Creative",
    icon: ImageIcon,
    short: "AI-generated ads, product images, and short-form video.",
    summary:
      "We make ad creative with AI. Product photos that look like a real shoot, video ads in the style your brand needs, multiple variants for testing. You get the assets, the source files, and the prompts so your team can iterate.",
    outcomes: [
      "Hundreds of ad variants without a photo shoot",
      "Product images that match your brand",
      "Short-form video for Reels, TikTok, Shorts",
    ],
    capabilities: [
      "AI product photography",
      "Video ads (UGC-style and brand)",
      "Static and motion ad creative",
      "Variant generation for testing",
      "Style guides for ongoing production",
    ],
    stack: ["Midjourney", "Flux", "Runway", "Sora", "ComfyUI", "Photoshop", "After Effects"],
  },
  {
    slug: "paid-ads",
    name: "Paid Ads",
    icon: Megaphone,
    short: "Run and manage your ad spend across Meta, Google, and more.",
    summary:
      "We run paid ads as a service. Strategy, creative testing, audience setup, daily optimisation, weekly reporting. We work with the creative we make in-house or whatever your team produces.",
    outcomes: [
      "Lower cost per acquisition over time",
      "Honest reporting on what's working",
      "A test pipeline so you keep finding winners",
    ],
    capabilities: [
      "Meta and Google ad management",
      "TikTok and YouTube campaigns",
      "Creative testing and iteration",
      "Audience and pixel setup",
      "Weekly performance reports",
    ],
    stack: ["Meta Ads", "Google Ads", "TikTok Ads", "GA4", "Triple Whale", "Northbeam"],
  },
  {
    slug: "ai-automation",
    name: "AI Automation",
    icon: Workflow,
    short: "Automate the boring, repetitive work your team is doing by hand.",
    summary:
      "We look at the manual work your team does every day and figure out what can be handed off. Result: fewer hours wasted, fewer mistakes, and a clear log of what got done.",
    outcomes: [
      "Less time spent on busywork",
      "Fewer human mistakes in routine tasks",
      "A record of what happened and when",
    ],
    capabilities: [
      "Document and email handling",
      "Approval workflows",
      "Internal copilots over your data",
      "Scheduled jobs and batch processing",
      "Human review where it matters",
    ],
    stack: ["Python", "TypeScript", "Temporal", "Inngest", "OpenAI", "Anthropic", "n8n"],
  },
  {
    slug: "ai-agents",
    name: "AI Agents",
    icon: Bot,
    short: "Voice and chat agents that resolve actual customer requests.",
    summary:
      "Most chatbots just answer questions. We build agents that can do things: book appointments, process refunds, look up orders, hand off to a human when they should. They plug into your CRM and phone system.",
    outcomes: [
      "Cover support 24/7 at a predictable cost",
      "Handle more requests without escalating",
      "Clean handoffs to your human team",
    ],
    capabilities: [
      "Voice agents for inbound and outbound calls",
      "Web and in-app chat agents",
      "Multilingual conversations",
      "Connected to your CRM and tools",
      "Quality scoring and conversation review",
    ],
    stack: ["LiveKit", "Twilio", "Vapi", "Retell", "OpenAI", "ElevenLabs", "LangGraph"],
  },
  {
    slug: "saas-development",
    name: "SaaS Development",
    icon: Layers,
    short: "We build SaaS products that hold up as you grow.",
    summary:
      "From the first version through your first big customers. We handle the parts that usually get rushed and break later: tenancy, billing, auth, security. You get something you won't have to rewrite next year.",
    outcomes: [
      "A solid base from your first commit",
      "Billing and auth done properly, not patched in later",
      "Code your future team can keep building on",
    ],
    capabilities: [
      "Multi-tenant setup",
      "Auth, roles, and audit logs",
      "Stripe billing and subscriptions",
      "Admin tools and impersonation",
      "Security practices that pass review",
    ],
    stack: ["Next.js", "TypeScript", "Postgres", "Prisma", "Stripe", "Clerk", "AWS"],
  },
  {
    slug: "web-development",
    name: "Web & Mobile",
    icon: Globe2,
    short: "Fast websites and apps that work well on any device.",
    summary:
      "Marketing sites, dashboards, internal tools, mobile apps. We care about page speed, accessibility, and SEO from the start, not as an afterthought.",
    outcomes: [
      "Pages that load fast on real phones",
      "Accessible to everyone, not just sighted users on fast Wi-Fi",
      "A design system your team can keep using",
    ],
    capabilities: [
      "Marketing sites and landing pages",
      "Internal dashboards and admin tools",
      "iOS and Android apps",
      "Component libraries",
      "Headless CMS setups",
    ],
    stack: ["Next.js", "React Native", "Expo", "Tailwind", "Sanity", "Vercel"],
  },
  {
    slug: "marketing-lifecycle",
    name: "Marketing & Lifecycle",
    icon: Mail,
    short: "Email, SMS, and lifecycle flows tied to real customer behaviour.",
    summary:
      "The marketing work that happens after the ad. Welcome flows, abandoned cart, post-purchase, win-back. Triggered off real product events so the messages make sense.",
    outcomes: [
      "Higher revenue per customer",
      "Email that doesn't get archived",
      "Less manual list-juggling for your team",
    ],
    capabilities: [
      "Email and SMS lifecycle flows",
      "Lead scoring and routing",
      "Attribution and reporting",
      "AI for content production",
      "CRM cleanup and hygiene",
    ],
    stack: ["Klaviyo", "HubSpot", "Customer.io", "Attio", "Segment", "Clay"],
  },
  {
    slug: "consulting",
    name: "AI Consulting",
    icon: Sparkles,
    short: "An honest second opinion before you spend on AI.",
    summary:
      "Sometimes you just need someone to look at your plan and tell you straight. We've built a lot of AI systems and we've seen which ones work and which don't. We'll help you avoid the expensive mistakes.",
    outcomes: [
      "A clear plan you can defend",
      "An honest read on what AI will and won't do for you",
      "Vendor advice with no hidden agenda",
    ],
    capabilities: [
      "AI opportunity reviews",
      "Vendor and model comparisons",
      "Build vs. buy decisions",
      "Data readiness checks",
      "Risk and governance planning",
    ],
    stack: ["Strategy", "Architecture review", "Vendor evaluation"],
  },
  {
    slug: "data-analytics",
    name: "Data & Analytics",
    icon: LineChart,
    short: "Dashboards your team will open every day.",
    summary:
      "Most analytics projects fail because the data is a mess, not because the charts are bad. We fix the data first: pipelines, modeling, cleaning. Then we build dashboards your team will keep using.",
    outcomes: [
      "One source of truth across your tools",
      "Dashboards that get opened, not just built",
      "Faster answers to the questions that matter",
    ],
    capabilities: [
      "Data warehouses and modeling",
      "ETL and ELT pipelines",
      "Operational dashboards",
      "Embedded analytics in your product",
      "Reverse ETL back into your tools",
    ],
    stack: ["dbt", "Snowflake", "BigQuery", "Postgres", "Metabase", "Hex", "Fivetran"],
  },
  {
    slug: "integrations",
    name: "API & Integrations",
    icon: Plug,
    short: "Get your systems talking to each other, properly.",
    summary:
      "Integrations are where most internal projects quietly break. We build them like distributed systems: with retries, idempotency, and good logging. So they don't just work in the demo.",
    outcomes: [
      "Reliable data flow between your tools",
      "No more silent failures or duplicate records",
      "Confidence to add the next integration",
    ],
    capabilities: [
      "CRM and ERP integrations",
      "Webhook ingestion",
      "iPaaS setups",
      "Custom connectors",
      "Reverse ETL into operational tools",
    ],
    stack: ["Node.js", "Python", "Temporal", "Inngest", "Kafka", "Webhooks"],
  },
  {
    slug: "cloud",
    name: "Cloud Solutions",
    icon: Cloud,
    short: "Cloud setups that are secure, affordable, and boring.",
    summary:
      "Boring is good when it comes to infrastructure. We design cloud setups you can defend in a security review and afford as you grow. Everything in code, monitored, and ready for the bad day.",
    outcomes: [
      "Lower monthly cloud bills",
      "Faster recovery when things break",
      "A foundation that passes compliance reviews",
    ],
    capabilities: [
      "AWS, GCP, and Vercel architectures",
      "Infrastructure as code",
      "Cost reviews",
      "CI/CD pipelines",
      "Backups and disaster recovery",
    ],
    stack: ["AWS", "GCP", "Vercel", "Terraform", "Pulumi", "Datadog"],
  },
  {
    slug: "outsourcing",
    name: "Dedicated Teams",
    icon: Users,
    short: "Senior engineers and operators embedded with your team.",
    summary:
      "When you need extra hands who know what they're doing. We put together small senior teams that work alongside yours. No layered agency, no junior bait-and-switch.",
    outcomes: [
      "People onboarded in weeks, not quarters",
      "Real senior engineers, not titles",
      "Clear scope and clean exits",
    ],
    capabilities: [
      "Embedded engineering teams",
      "Fractional CTO or Head of AI",
      "Operations and BPO support",
      "Customer support setups",
      "Project-based teams",
    ],
    stack: ["Linear", "Slack", "GitHub", "Notion"],
  },
];

export const servicesBySlug = Object.fromEntries(services.map((s) => [s.slug, s]));
