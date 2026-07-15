"use client"

import { useState } from "react";
import { Check } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useRoomActions } from "@/context/RoomActionsContext";
import { Reveal } from "./Reveal";

export function PricingSection() {
  const [annual, setAnnual] = useState(true);
  const { createRoom } = useRoomActions();

  const plans = [
    {
      name: "Free",
      blurb: "For quick calls and small teams.",
      price: "$0",
      unit: "forever",
      featured: false,
      btnVariant: "secondary" as const,
      cta: "Create room",
      action: createRoom,
      features: ["Unlimited 1:1 calls", "Group rooms up to 12", "45-minute group limit", "Screen share & chat"],
    },
    {
      name: "Business",
      blurb: "For growing teams that meet daily.",
      price: annual ? "$12" : "$15",
      unit: "per user / month",
      featured: true,
      btnVariant: "default" as const,
      cta: "Start with Business",
      action: createRoom,
      features: ["Rooms up to 300", "Cloud recording & transcripts", "Live captions, 30+ languages", "SSO-lite & admin dashboard"],
    },
    {
      name: "Enterprise",
      blurb: "For orgs with real requirements.",
      price: "Custom",
      unit: "talk to us",
      featured: false,
      btnVariant: "secondary" as const,
      cta: "Talk to sales",
      action: () => {
        window.location.href = "mailto:sales@meetwise.io";
      },
      features: ["Rooms up to 500", "SAML SSO & SCIM", "SOC 2, HIPAA & data residency", "Dedicated success manager"],
    },
  ];

  return (
    <section id="pricing" className="border-t border-border bg-muted">
      <div className="mx-auto max-w-[1200px] px-5 py-20 sm:px-10 lg:py-24">
        <Reveal className="mx-auto max-w-[620px] text-center">
          <span className="font-body text-xs font-medium uppercase tracking-[0.06em] text-primary">Pricing</span>
          <h2 className="mt-3.5 font-display text-3xl font-semibold leading-[1.1] tracking-[-0.025em] text-foreground sm:text-4xl">
            Simple pricing. No surprises.
          </h2>
          <p className="mt-4 font-body text-lg leading-[1.55] text-muted-foreground">
            Start free — no card, no sign-up. Upgrade when your team grows.
          </p>
          <div className="mt-[26px] inline-flex rounded-pill border border-border bg-background p-1">
            <button
              onClick={() => setAnnual(false)}
              className={cn(
                "rounded-pill px-4 py-[9px] font-body text-[13px] font-semibold transition-all duration-fast ease-smooth",
                !annual ? "bg-primary text-primary-foreground" : "text-muted-foreground"
              )}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={cn(
                "rounded-pill px-4 py-[9px] font-body text-[13px] font-semibold transition-all duration-fast ease-smooth",
                annual ? "bg-primary text-primary-foreground" : "text-muted-foreground"
              )}
            >
              Annual · save 20%
            </button>
          </div>
        </Reveal>

        <Reveal className="mt-11 grid grid-cols-1 items-start gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {plans.map((p) => (
            <div
              key={p.name}
              className={cn(
                "relative rounded-lg border bg-card p-7 font-body",
                p.featured ? "border-[1.5px] border-primary shadow-lg" : "border-border shadow-xs"
              )}
            >
              {p.featured && (
                <div className="absolute right-5 top-5">
                  <Badge tone="violet">Most popular</Badge>
                </div>
              )}
              <div className="font-display text-xl font-semibold text-foreground">{p.name}</div>
              <p className="mt-1.5 min-h-[38px] font-body text-sm text-muted-foreground">{p.blurb}</p>
              <div className="mt-[18px] flex items-baseline gap-1.5">
                <span className="font-display text-[42px] font-semibold tracking-[-0.02em] text-foreground">{p.price}</span>
                <span className="font-body text-sm text-muted-foreground">{p.unit}</span>
              </div>
              <div className="mt-[22px]">
                <Button variant={p.btnVariant} className="w-full" onClick={p.action}>
                  {p.cta}
                </Button>
              </div>
              <div className="my-[22px] h-px bg-border" />
              <div className="flex flex-col gap-3">
                {p.features.map((feat) => (
                  <div key={feat} className="flex items-start gap-2.5 font-body text-sm text-muted-foreground">
                    <Check className="mt-0.5 h-[15px] w-[15px] shrink-0 text-primary" />
                    {feat}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
