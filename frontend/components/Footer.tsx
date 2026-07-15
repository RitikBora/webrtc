import { Video } from "lucide-react"

const FOOTER_COLUMNS = [
  { title: "Product", links: ["Rooms", "Recordings", "Integrations", "Mobile apps"] },
  { title: "Company", links: ["About", "Careers", "Blog", "Contact"] },
  { title: "Resources", links: ["Docs", "Security", "Status", "Changelog"] },
]

export const Footer = () => {
  return (
    <footer className="w-full shrink-0 bg-ink-950">
      <div className="mx-auto max-w-[1200px] px-5 pb-10 pt-16 sm:px-10">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-[1.6fr_1fr_1fr_1fr]">
          <div className="col-span-2 sm:col-span-1">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-pill bg-primary text-primary-foreground">
                <Video className="h-[18px] w-[18px]" />
              </span>
              <span className="font-display text-xl font-semibold tracking-[-0.02em] text-white">Meetwise</span>
            </div>
            <p className="mt-3.5 max-w-[260px] font-body text-sm text-ink-400">
              Meetings that start the moment you do. No sign-up, no downloads — just a link.
            </p>
          </div>
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.title}>
              <div className="mb-3.5 font-body text-sm font-medium text-white">{col.title}</div>
              <div className="flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <a key={link} href="#" className="font-body text-sm text-ink-400 hover:text-ink-200">
                    {link}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-center gap-3 border-t border-white/10 pt-6 font-body text-xs text-ink-400 sm:flex-row sm:justify-between">
          <span>© 2026 Meetwise, Inc. All rights reserved.</span>
          <div className="flex gap-5">
            <a href="#" className="text-ink-400 hover:text-ink-200">Privacy</a>
            <a href="#" className="text-ink-400 hover:text-ink-200">Terms</a>
            <a href="#" className="text-ink-400 hover:text-ink-200">Status</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
