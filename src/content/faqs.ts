export interface FAQ {
  question: string;
  answer: string;
}

export const homepageFaqs: FAQ[] = [
  {
    question: "How do we start working together?",
    answer:
      "Send us a message through the contact form. We'll reply within one business day, usually with a few questions and a rough scope. If we're not the right fit, we'll say so and try to point you somewhere better.",
  },
  {
    question: "What does it cost?",
    answer:
      "Depends on the project. Smaller builds run on a fixed price. Ongoing work is monthly. Advisory is hourly. Either way, you get a written scope and price before any work starts, and we don't change the price mid-project.",
  },
  {
    question: "Will our data be safe?",
    answer:
      "Yes. We work under NDA, use scoped credentials, and keep your data inside your own systems where possible. We don't train models on your data, and we don't share it with anyone.",
  },
];
