import { Reveal } from "./Reveal";

const LOGOS = ["Northwind", "Lumina", "Vantage", "Harbor", "Meridian", "Quill"];

export function LogosSection() {
  return (
    <section className="border-y border-border bg-muted">
      <Reveal className="mx-auto max-w-[1200px] px-5 py-10 sm:px-10">
        <p className="mb-6 text-center font-body text-xs font-medium uppercase tracking-[0.06em] text-muted-foreground">
          Trusted by teams that meet a lot
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4">
          {LOGOS.map((logo) => (
            <span key={logo} className="font-display text-xl font-semibold tracking-[-0.02em] text-muted-foreground/85">
              {logo}
            </span>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
