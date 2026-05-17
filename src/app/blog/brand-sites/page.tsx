import Link from "next/link";

export default function BrandSitesBlog() {
  return (
    <div className="container mx-auto py-24 px-4 max-w-3xl">
      <Link href="/#insights" className="text-primary hover:text-primary-glow mb-8 inline-block transition-colors">
        ← Back to Insights
      </Link>
      <article className="prose prose-invert lg:prose-xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-fg">Why Your Indie Brand Needs More Than a Shopify Theme</h1>
        <div className="flex items-center gap-4 text-sm text-fg-muted mb-12">
          <span>Brand sites</span>
          <span>•</span>
          <span>4-minute read</span>
        </div>
        
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1200&q=80" alt="Brand Site Design" className="w-full rounded-xl mb-12" />
        
        <div className="space-y-6 text-fg-dim text-lg leading-relaxed">
          <p>
            When launching an indie brand, the temptation to grab an off-the-shelf Shopify theme and start selling is high. It's fast, it's cheap, and it works. But as your brand grows, the limitations of a generic template become glaringly obvious.
          </p>
          <h2 className="text-2xl font-semibold text-fg mt-10 mb-4">The Premium Feel is in the Details</h2>
          <p>
            The difference between a generic store and a premium brand experience lies in the small design choices. Custom typography, bespoke hover states, and smooth page transitions aren't just decorative, they communicate value. When a customer lands on a site that feels meticulously crafted, that perception of quality transfers to the products themselves.
          </p>
          <h2 className="text-2xl font-semibold text-fg mt-10 mb-4">Story-Driven Commerce</h2>
          <p>
            Modern consumers don't just buy products; they buy into narratives. A standard product grid doesn't tell a story. Custom storefronts allow you to weave editorial content seamlessly into the shopping experience. You can contextualize products, highlight the founder's journey, and explain the sourcing process without forcing users to navigate away to a separate "About" page.
          </p>
          <h2 className="text-2xl font-semibold text-fg mt-10 mb-4">Speed and Performance</h2>
          <p>
            Many popular themes are bloated with features you don't need, leading to slow load times. A custom-built headless storefront using modern frameworks like Next.js ensures your site is blazing fast. Every millisecond counts when it comes to mobile conversion rates, and a bespoke build gives you absolute control over performance.
          </p>
          <h2 className="text-2xl font-semibold text-fg mt-10 mb-4">Future-Proofing Your Business</h2>
          <p>
            As your catalog expands and your marketing strategies evolve, a custom architecture scales with you. You aren't locked into the constraints of a rigid theme editor. Whether you want to integrate a complex 3D product viewer, a custom subscription portal, or unique bundling logic, a custom site provides the ultimate flexibility.
          </p>
          <p className="mt-12 pt-8 border-t border-border italic">
            Ready to elevate your brand's digital presence? Moving beyond a basic theme might be the investment that takes your indie label to the next level.
          </p>
        </div>
      </article>
    </div>
  );
}
