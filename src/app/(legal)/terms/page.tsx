import type { Metadata } from "next";
import { pageMetadata, siteConfig } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Terms of Service",
  description: `${siteConfig.legalName} terms of service.`,
  path: "/terms",
});

export default function TermsPage() {
  return (
    <article className="container max-w-3xl py-20 lg:py-28">
      <header>
        <div className="font-mono text-xs uppercase tracking-[0.14em] text-fg-subtle">Legal</div>
        <h1 className="mt-3 text-display-lg font-semibold">Terms of Service</h1>
        <p className="mt-3 text-fg-muted">
          Last updated:{" "}
          {new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </header>

      <div className="mt-10 space-y-8 text-[15px] leading-relaxed text-fg-muted [&_h2]:text-base [&_h2]:font-semibold [&_h2]:tracking-tight [&_h2]:text-fg [&_h2]:mb-2 [&_p]:mt-2">
        <section>
          <h2>1. Use of the site</h2>
          <p>
            By accessing amplixia.com you agree to use it lawfully and in accordance with
            these terms. The content is provided for informational purposes; engagements
            are governed by separate written agreements.
          </p>
        </section>
        <section>
          <h2>2. Intellectual property</h2>
          <p>
            All site content is owned by {siteConfig.legalName} or its licensors. You may
            not copy, redistribute, or create derivative works without permission, except
            for normal browsing and personal reference.
          </p>
        </section>
        <section>
          <h2>3. No warranty</h2>
          <p>
            The site is provided &ldquo;as is.&rdquo; We make no warranty that the site
            will be uninterrupted or error-free, or that information here is up-to-date in
            every detail.
          </p>
        </section>
        <section>
          <h2>4. Limitation of liability</h2>
          <p>
            To the maximum extent permitted by law, {siteConfig.legalName} is not liable
            for indirect or consequential damages arising from use of the site.
          </p>
        </section>
        <section>
          <h2>5. Governing law</h2>
          <p>
            These terms are governed by the laws of the jurisdiction in which{" "}
            {siteConfig.legalName} is registered, without regard to conflict-of-law
            principles.
          </p>
        </section>
        <section>
          <h2>6. Contact</h2>
          <p>
            For questions about these terms:{" "}
            <a className="text-fg underline" href={`mailto:${siteConfig.email}`}>
              {siteConfig.email}
            </a>.
          </p>
        </section>
        <p className="text-xs text-fg-subtle">
          This document is provided as a starting template. Have it reviewed by counsel
          familiar with the jurisdictions where you operate before publication.
        </p>
      </div>
    </article>
  );
}
