"use client"

import { useState } from "react";

import { cn } from "@/lib/utils";
import { CharacterTile } from "./CharacterTile";
import { DecorativeCallControls } from "./DecorativeCallControls";
import { Reveal } from "./Reveal";
import { showPeople, sidePeople, speaker } from "./people";

type Tab = "gallery" | "speaker" | "screen";

const TABS: { key: Tab; label: string }[] = [
  { key: "gallery", label: "Gallery" },
  { key: "speaker", label: "Speaker" },
  { key: "screen", label: "Screen share" },
];

const BARS = [
  { label: "AMER", h: "82%", color: "var(--violet-600)" },
  { label: "EMEA", h: "64%", color: "var(--violet-400)" },
  { label: "APAC", h: "92%", color: "var(--violet-300)" },
  { label: "LATAM", h: "48%", color: "var(--violet-200)" },
  { label: "MEA", h: "38%", color: "var(--ink-200)" },
];

const STATS = [
  { value: "99.99%", label: "uptime, backed by SLA" },
  { value: "4M+", label: "rooms hosted every month" },
  { value: "190", label: "countries connected" },
  { value: "120ms", label: "median global latency" },
];

export function ShowcaseSection() {
  const [tab, setTab] = useState<Tab>("gallery");

  return (
    <section id="showcase" className="bg-ink-900">
      <div className="mx-auto max-w-[1200px] px-5 py-20 sm:px-10 lg:py-24">
        <Reveal className="mx-auto max-w-[660px] text-center">
          <span className="font-body text-xs font-medium uppercase tracking-[0.06em] text-violet-300">The room</span>
          <h2 className="mt-3.5 font-display text-3xl font-semibold leading-[1.1] tracking-[-0.025em] text-white sm:text-4xl">
            The room does the work.
          </h2>
          <p className="mt-4 font-body text-lg leading-[1.55] text-ink-300">
            Gallery, speaker, or a shared screen — switch how you see the room without breaking your flow.
          </p>
        </Reveal>

        <Reveal className="mb-6 mt-8 flex justify-center gap-2">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={cn(
                "rounded-pill px-[18px] py-2 font-body text-[13px] font-semibold transition-all duration-fast ease-smooth",
                tab === t.key ? "bg-primary text-white" : "bg-white/[.06] text-ink-300 hover:bg-white/10"
              )}
            >
              {t.label}
            </button>
          ))}
        </Reveal>

        <Reveal className="relative rounded-lg border border-white/10 bg-ink-800 p-4 shadow-[0_40px_90px_-40px_rgba(0,0,0,0.7)]">
          <div className="flex items-center justify-between px-2 pb-3.5 pt-1">
            <div className="flex items-center gap-2 font-body text-sm font-medium text-white">
              All-hands · everyone
              <span className="inline-flex items-center gap-1.5 rounded-pill bg-[rgba(46,217,163,0.16)] px-2.5 py-[3px] font-body text-xs text-green-300">
                <span className="h-1.5 w-1.5 rounded-full bg-green-500 [animation:mwDot_2s_var(--ease-smooth)_infinite]" />
                Recording
              </span>
            </div>
            <span className="font-body text-xs text-white/55">12 people · 28:04</span>
          </div>

          {tab === "gallery" && (
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
              {showPeople.map((p) => (
                <CharacterTile key={p.label} {...p} />
              ))}
            </div>
          )}

          {tab === "speaker" && (
            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-[2.4fr_1fr]">
              <CharacterTile {...speaker} speaks className="sm:h-[360px] sm:aspect-auto" />
              <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-1 sm:grid-rows-4">
                {sidePeople.map((p) => (
                  <CharacterTile key={p.label} {...p} className="sm:h-[80px] sm:aspect-auto" />
                ))}
              </div>
            </div>
          )}

          {tab === "screen" && (
            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-[2.4fr_1fr]">
              <div className="flex min-h-[280px] flex-col rounded-md bg-white px-6 py-[26px] shadow-md sm:min-h-[340px]">
                <div className="flex items-center justify-between">
                  <div className="font-display text-lg font-semibold text-ink-900">Q3 revenue by region</div>
                  <span className="font-body text-xs text-ink-400">Meetwise · shared by Ava</span>
                </div>
                <div className="mt-7 flex flex-1 items-end gap-5 pb-2">
                  {BARS.map((b) => (
                    <div key={b.label} className="flex h-full flex-1 flex-col items-center justify-end gap-2.5">
                      <div className="w-full rounded-t-lg rounded-b-[4px]" style={{ height: b.h, background: b.color }} />
                      <span className="font-body text-xs text-ink-400">{b.label}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-1 sm:grid-rows-4">
                {sidePeople.map((p) => (
                  <CharacterTile key={p.label} {...p} className="sm:h-[80px] sm:aspect-auto" />
                ))}
              </div>
            </div>
          )}

          <div className="mt-4 flex justify-center">
            <div className="inline-flex items-center gap-2 rounded-pill bg-[rgba(13,12,19,0.6)] px-4 py-2 font-body text-sm text-white backdrop-blur-md">
              <span className="font-semibold text-violet-300">Ava</span> let's lock the roadmap by Friday and loop in security.
            </div>
          </div>
          <div className="mt-3.5 flex justify-center">
            <DecorativeCallControls />
          </div>
        </Reveal>
      </div>

      <div id="security" className="border-t border-white/10">
        <Reveal className="mx-auto grid max-w-[1200px] grid-cols-2 gap-6 px-5 py-16 sm:px-10 lg:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label}>
              <div className="font-display text-[34px] font-semibold leading-none tracking-[-0.02em] text-white sm:text-[46px]">
                {s.value}
              </div>
              <div className="mt-2 font-body text-[15px] text-ink-300">{s.label}</div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
