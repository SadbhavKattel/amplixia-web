import Link from "next/link";

export default function AITutoringBlog() {
  return (
    <div className="container mx-auto py-24 px-4 max-w-3xl">
      <Link href="/#insights" className="text-primary hover:text-primary-glow mb-8 inline-block transition-colors">
        ← Back to Insights
      </Link>
      <article className="prose prose-invert lg:prose-xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-fg">How We Built a 24/7 AI Tutor That Actually Helps</h1>
        <div className="flex items-center gap-4 text-sm text-fg-muted mb-12">
          <span>AI tutoring</span>
          <span>•</span>
          <span>6-minute read</span>
        </div>
        
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200&q=80" alt="AI Tutoring" className="w-full rounded-xl mb-12" />
        
        <div className="space-y-6 text-fg-dim text-lg leading-relaxed">
          <p>
            The promise of AI in education is immense, but the reality often falls short. Throwing a generic chatbot wrapper at students usually results in frustration. They get factually incorrect answers, confusing explanations, or worst of all, the system simply gives them the final answer without teaching them the process.
          </p>
          <p>
            When we set out to build an AI tutoring workflow, the goal wasn't just to provide answers. The goal was to build a system that acts like a patient, knowledgeable human tutor available at any hour.
          </p>
          <h2 className="text-2xl font-semibold text-fg mt-10 mb-4">The Socratic Method at Scale</h2>
          <p>
            The core breakthrough was shifting the AI's prompt architecture from an "answer engine" to a "Socratic guide." Instead of solving the math equation immediately, the system is instructed to identify where the student is stuck, validate their correct steps, and gently prompt them to discover the next logical step on their own.
          </p>
          <p>
            This requires complex system prompts that dictate the persona, the boundaries of assistance, and the pedagogical approach. The AI must be trained to recognize common misconceptions and address them proactively.
          </p>
          <h2 className="text-2xl font-semibold text-fg mt-10 mb-4">Context is Everything</h2>
          <p>
            A good tutor remembers what the student struggled with yesterday. To replicate this, we integrated long-term memory via a vector database. The AI can pull up previous sessions, note recurring weaknesses, and tailor its current explanations accordingly. If a student historically struggles with fractions, the tutor will automatically break down fraction-heavy physics problems more granularly.
          </p>
          <h2 className="text-2xl font-semibold text-fg mt-10 mb-4">Guardrails and Safety</h2>
          <p>
            Deploying AI for students requires rigorous safety measures. We implemented a multi-layered moderation system. The primary model generates the response, but a secondary, faster model evaluates that response for appropriateness, tone, and pedagogical soundness before it ever reaches the student's screen.
          </p>
          <p className="mt-12 pt-8 border-t border-border italic">
            Building an effective AI tutor is less about having the most powerful language model, and more about meticulously designing the interaction loop. It's a UX challenge as much as an engineering one.
          </p>
        </div>
      </article>
    </div>
  );
}
