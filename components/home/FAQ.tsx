"use client";

import { useState } from "react";

const faqs = [
  {
    question: "Who is FitIQ for?",
    answer:
      "FitIQ is designed for beginners, intermediate and advanced fitness enthusiasts.",
  },
  {
    question: "What do I get with the membership?",
    answer:
      "You get unlimited workout programs, nutrition guidance and progress tracking.",
  },
  {
    question: "Can I cancel anytime?",
    answer: "Yes, you can cancel your membership anytime.",
  },
  {
    question: "Do I need a gym membership?",
    answer:
      "No. FitIQ will offer both gym and home workout programs.",
  },
  {
    question: "Will new workout programs be added?",
    answer:
      "Yes. New workout programs and features will be added regularly.",
  },
  {
    question: "Is FitIQ beginner friendly?",
    answer:
      "Absolutely! FitIQ is designed for beginners as well as advanced users.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };

  return (
    <section id="faq" className="bg-white py-32">
      <div className="mx-auto max-w-4xl px-6">
        <h2 className="text-center text-5xl font-black">
          Frequently Asked Questions
        </h2>

        <p className="mt-5 text-center text-gray-600">
          Everything you need to know about FitIQ.
        </p>

        <div className="mt-16 space-y-6">
          {faqs.map((faq, index) => (
            <div
              key={faq.question}
              onClick={() => handleToggle(index)}
              className="cursor-pointer rounded-2xl border border-gray-200 p-6 shadow-sm transition hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold">
                  {faq.question}
                </h3>

                <span className="text-2xl font-bold">
                  {openIndex === index ? "−" : "+"}
                </span>
              </div>

              {openIndex === index && (
                <p className="mt-4 text-gray-600">
                  {faq.answer}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}