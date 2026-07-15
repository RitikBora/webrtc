import { Captions, Link, ScreenShare, ShieldCheck, SlidersHorizontal, Users } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Reveal } from "./Reveal";

const FEATURES = [
  {
    icon: Link,
    title: "Rooms in one click",
    desc: "Share a link and you're live. No accounts, no installs — for you or your guests.",
  },
  {
    icon: ShieldCheck,
    title: "Encrypted by default",
    desc: "Every room is end-to-end encrypted. Your conversations stay yours.",
  },
  {
    icon: Users,
    title: "Scales to 500",
    desc: "From a quick 1:1 to an all-hands of 500, the video stays crisp and in sync.",
  },
  {
    icon: Captions,
    title: "Captions & transcripts",
    desc: "Real-time captions in 30+ languages, saved as searchable meeting notes.",
  },
  {
    icon: ScreenShare,
    title: "Screen share & co-watch",
    desc: "Present, annotate, and watch together with zero lag — right in the room.",
  },
  {
    icon: SlidersHorizontal,
    title: "Admin, SSO & SCIM",
    desc: "SAML SSO, SCIM provisioning, and controls your IT team will actually like.",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="bg-background">
      <div className="mx-auto max-w-[1200px] px-5 py-20 sm:px-10 lg:py-24">
        <Reveal className="max-w-[640px]">
          <span className="font-body text-xs font-medium uppercase tracking-[0.06em] text-primary">Why Meetwise</span>
          <h2 className="mt-3.5 font-display text-3xl font-semibold leading-[1.1] tracking-[-0.025em] text-foreground sm:text-4xl">
            Everything a meeting needs. Nothing it doesn't.
          </h2>
          <p className="mt-4 font-body text-lg leading-[1.55] text-muted-foreground">
            One link gets anyone in. Underneath it, the video, the scale, and the security your IT team signs off on.
          </p>
        </Reveal>
        <Reveal className="mt-11 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map(({ icon: Icon, title, desc }) => (
            <Card key={title} padding="lg">
              <span className="inline-flex h-[46px] w-[46px] items-center justify-center rounded-md bg-accent text-primary">
                <Icon className="h-[22px] w-[22px]" />
              </span>
              <h3 className="mt-[18px] font-display text-xl font-semibold text-foreground">{title}</h3>
              <p className="mt-2.5 font-body text-[15px] leading-[1.55] text-muted-foreground">{desc}</p>
            </Card>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
