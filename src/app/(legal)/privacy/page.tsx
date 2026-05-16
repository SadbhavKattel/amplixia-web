import type { Metadata } from "next";
import { pageMetadata, siteConfig } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description: `${siteConfig.legalName} privacy policy.`,
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <article className="container max-w-3xl py-20 lg:py-28">
      <header>
        <div className="font-mono text-xs uppercase tracking-[0.14em] text-fg-subtle">Legal</div>
        <h1 className="mt-3 text-display-lg font-semibold">Privacy Policy</h1>
        <p className="mt-3 text-fg-muted">
          Last updated:{" "}
          {new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </header>

      <div className="mt-10 space-y-8 text-[15px] leading-relaxed text-fg-muted [&_h2]:text-base [&_h2]:font-semibold [&_h2]:tracking-tight [&_h2]:text-fg [&_h2]:mb-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5 [&_ul]:mt-2 [&_p]:mt-2">
        <section>
          <h2>1. Who we are</h2>
          <p>
            This site is operated by {siteConfig.legalName} (&ldquo;Amplixia,&rdquo;
            &ldquo;we,&rdquo; &ldquo;us&rdquo;). This policy describes what information we
            collect when you use amplixia.com, why we collect it, and the choices you have.
          </p>
        </section>

        <section>
          <h2>2. Information we collect</h2>
          <p>We collect only what we need to respond to you and operate the site:</p>
          <ul>
            <li>Information you submit through forms (name, email, company, project details).</li>
            <li>Server logs containing IP address, user agent, and referrer for security and abuse prevention.</li>
            <li>Privacy-respecting analytics covering page views and aggregate engagement.</li>
          </ul>
          <p>We do not sell your information. We do not use your form submissions to train AI models.</p>
        </section>

        <section>
          <h2>3. How we use it</h2>
          <ul>
            <li>To respond to inquiries and operate engagements you initiate.</li>
            <li>To prevent abuse of the site (rate limiting, bot detection).</li>
            <li>To improve the site through aggregate, non-identifying analytics.</li>
          </ul>
        </section>

        <section>
          <h2>4. Service providers</h2>
          <p>
            We use a small set of vendors to operate the site (hosting, transactional
            email, abuse prevention). These vendors process data on our behalf under data
            processing agreements.
          </p>
        </section>

        <section>
          <h2>5. Retention</h2>
          <p>
            We retain inquiry data for as long as needed to respond and to maintain a
            record of the engagement. You may request deletion at any time by emailing{" "}
            <a className="text-fg underline" href={`mailto:${siteConfig.email}`}>
              {siteConfig.email}
            </a>.
          </p>
        </section>

        <section>
          <h2>6. Your rights</h2>
          <p>
            Depending on your jurisdiction, you may have rights to access, correct, export,
            or delete your data, and to object to certain processing. Contact us to
            exercise any of these.
          </p>
        </section>

        <section>
          <h2>7. Contact</h2>
          <p>
            Questions about this policy: <a className="text-fg underline" href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
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
