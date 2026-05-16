import type { Metadata } from "next";
import { absoluteUrl } from "./utils";

export const siteConfig = {
  name: "Amplixia",
  legalName: "Amplixia Private Limited",
  description:
    "Amplixia builds AI automation, agents, and custom software for businesses.",
  shortDescription: "AI software for businesses.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  locale: "en_US",
  twitter: "@amplixia",
  email: "services@amplixia.com",
} as const;

interface PageMetaArgs {
  title?: string;
  description?: string;
  path?: string;
  noIndex?: boolean;
}

export function pageMetadata({
  title,
  description,
  path = "/",
  noIndex = false,
}: PageMetaArgs = {}): Metadata {
  const fullTitle = title ? `${title} · ${siteConfig.name}` : siteConfig.name;
  const desc = description ?? siteConfig.description;
  const url = absoluteUrl(path);

  return {
    title: fullTitle,
    description: desc,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      title: fullTitle,
      description: desc,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: desc,
      creator: siteConfig.twitter,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: { index: true, follow: true, "max-image-preview": "large" },
        },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.legalName,
    alternateName: siteConfig.name,
    url: siteConfig.url,
    logo: absoluteUrl("/icon.png"),
    description: siteConfig.description,
    sameAs: [],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        email: siteConfig.email,
        areaServed: "Worldwide",
        availableLanguage: ["en"],
      },
    ],
  };
}

export function webSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
  };
}
