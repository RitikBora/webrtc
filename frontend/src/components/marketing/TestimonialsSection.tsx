import { Avatar } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Reveal } from "./Reveal";

const TESTIMONIALS = [
  {
    quote: "We deleted three tools the week we switched. People just click a link and they’re in.",
    name: "Dana Whitfield",
    role: "Head of IT · Northwind",
  },
  {
    quote: "The transcripts alone pay for it. Every meeting is searchable now, and nobody takes notes.",
    name: "Marcus Lee",
    role: "Ops Lead · Lumina",
  },
  {
    quote: "Security signed off in a day. With SSO and E2E encryption, that never happens.",
    name: "Priya Rao",
    role: "CISO · Cedar & Co",
  },
];

export function TestimonialsSection() {
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-[1200px] px-5 py-20 sm:px-10 lg:py-24">
        <Reveal className="max-w-[620px]">
          <span className="font-body text-xs font-medium uppercase tracking-[0.06em] text-primary">Loved by teams</span>
          <h2 className="mt-3.5 font-display text-3xl font-semibold leading-[1.1] tracking-[-0.025em] text-foreground sm:text-4xl">
            Teams don't go back.
          </h2>
        </Reveal>
        <Reveal className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <Card key={t.name} padding="lg">
              <p className="font-body text-[19px] font-medium leading-[1.5] text-foreground">&ldquo;{t.quote}&rdquo;</p>
              <div className="mt-[22px] flex items-center gap-3">
                <Avatar name={t.name} size="md" />
                <div>
                  <div className="font-body text-sm font-medium text-foreground">{t.name}</div>
                  <div className="font-body text-xs text-muted-foreground">{t.role}</div>
                </div>
              </div>
            </Card>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
