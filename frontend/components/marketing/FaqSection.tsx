"use client"

import { useState } from "react";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

const FAQS: [string, string][] = [
  [
    "Do people need an account to join?",
    "Nope. You create a room and share the link — anyone with it can join straight from their browser, no sign-up and no download. Accounts only matter once you want admin controls or recordings saved to your team.",
  ],
  [
    "How secure is Meetwise?",
    "Every room is end-to-end encrypted by default. We’re SOC 2 Type II certified, support SAML SSO and SCIM, and offer HIPAA and data-residency options on Enterprise.",
  ],
  [
    "How many people can join one room?",
    "Free rooms hold up to 12, Business up to 300, and Enterprise up to 500 — all with the same crisp, in-sync video.",
  ],
  [
    "Can I record and get transcripts?",
    "Yes. Business and Enterprise plans include cloud recording and real-time transcripts in 30+ languages, saved as searchable notes right after the call.",
  ],
  [
    "Does it work on mobile?",
    "It does — the room runs in any modern mobile browser, and native iOS and Android apps are available if you’d rather.",
  ],
];

export function FaqSection() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="bg-background">
      <div className="mx-auto max-w-[820px] px-5 py-20 sm:px-10 lg:py-24">
        <Reveal className="text-center">
          <span className="font-body text-xs font-medium uppercase tracking-[0.06em] text-primary">FAQ</span>
          <h2 className="mt-3.5 font-display text-3xl font-semibold leading-[1.1] tracking-[-0.025em] text-foreground sm:text-4xl">
            Questions, answered.
          </h2>
        </Reveal>
        <Reveal className="mt-10 border-t border-border">
          {FAQS.map(([q, a], i) => {
            const isOpen = open === i;
            return (
              <div key={q} className="border-b border-border">
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="flex w-full items-center justify-between gap-4 py-[22px] text-left font-display text-lg font-semibold text-foreground"
                >
                  {q}
                  <ChevronDown
                    className={cn(
                      "h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-base ease-smooth",
                      isOpen && "rotate-180"
                    )}
                  />
                </button>
                {isOpen && (
                  <p className="max-w-[640px] pb-6 font-body text-[15px] leading-[1.55] text-muted-foreground">{a}</p>
                )}
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
