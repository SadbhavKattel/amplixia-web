import Link from "next/link";

export default function AutomationBlog() {
  return (
    <div className="container mx-auto py-24 px-4 max-w-3xl">
      <Link href="/#insights" className="text-primary hover:text-primary-glow mb-8 inline-block transition-colors">
        ← Back to Insights
      </Link>
      <article className="prose prose-invert lg:prose-xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-fg">5-Quick AI Automation for Small Teams</h1>
        <div className="flex items-center gap-4 text-sm text-fg-muted mb-12">
          <span>Automation</span>
          <span>•</span>
          <span>5-minute read</span>
        </div>
        
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=80" alt="Automation" className="w-full rounded-xl mb-12" />
        
        <div className="space-y-6 text-fg-dim text-lg leading-relaxed">
          <p>
            For small teams, time is the most constrained resource. While enterprise companies deploy massive, cross-departmental AI implementations, small businesses can achieve disproportionate wins by automating the mundane, repetitive tasks that drain their day. Here are five practical AI automations you can implement this week.
          </p>
          <h2 className="text-2xl font-semibold text-fg mt-10 mb-4">1. Intelligent Email Triage</h2>
          <p>
            Stop drowning in generic inquiries. Connect your support inbox to an LLM via Zapier or Make. The AI can read incoming emails, categorize them (e.g., Support, Sales, Spam), extract key entities like order numbers, and route the ticket to the correct Slack channel or team member instantly.
          </p>
          <h2 className="text-2xl font-semibold text-fg mt-10 mb-4">2. The "First Draft" Content Generator</h2>
          <p>
            Blank page syndrome is real. Create an automation where a team member drops a few bullet points into a Notion database. This triggers an AI workflow that expands those bullets into a structured first draft for a blog post or newsletter, perfectly formatted and deposited right back into Notion for human review.
          </p>
          <h2 className="text-2xl font-semibold text-fg mt-10 mb-4">3. Automated Meeting Summaries and Action Items</h2>
          <p>
            Instead of designating a note-taker, use tools like Fireflies or Otter.ai. But take it a step further: set up an automation that takes the raw transcript, extracts specific action items assigned to specific people, and automatically creates tasks in your project management tool (like Asana or Linear).
          </p>
          <h2 className="text-2xl font-semibold text-fg mt-10 mb-4">4. Lead Qualification Bot</h2>
          <p>
            Instead of a static contact form, use an AI-driven conversational form. It can ask follow-up questions based on the user's input, score the lead's quality based on your criteria, and instantly book high-value leads onto your calendar, while gently routing low-fit leads to self-serve resources.
          </p>
          <h2 className="text-2xl font-semibold text-fg mt-10 mb-4">5. Social Listening and Sentiment Analysis</h2>
          <p>
            Monitor mentions of your brand across Twitter, Reddit, and LinkedIn. Feed these mentions into an AI to perform sentiment analysis. If a mention is highly negative, trigger an urgent Slack alert to your customer success team. If it's positive, route it to marketing as a potential testimonial.
          </p>
          <p className="mt-12 pt-8 border-t border-border italic">
            The key to successful AI automation isn't replacing human work, it's removing the friction so humans can focus on high-leverage, creative tasks.
          </p>
        </div>
      </article>
    </div>
  );
}
