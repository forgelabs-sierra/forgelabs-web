import { Button } from '@/components/ui/button'
import type { HeroProps } from '@/lib/shortcodes'
import { ArrowRight } from 'lucide-react'

export function HeroSection({ title, subtitle, cta, cta2 }: HeroProps) {
  const [ctaText, ctaLink] = cta?.split('|') ?? ['Get Started', '#contact']
  const [cta2Text, cta2Link] = cta2?.split('|') ?? []

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden" style={{ background: 'linear-gradient(135deg, hsl(222, 47%, 8%) 0%, hsl(225, 50%, 12%) 50%, hsl(218, 45%, 10%) 100%)' }}>
      {/* Grid overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40" />
      {/* Gradient orbs for depth */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10" style={{ background: 'radial-gradient(circle, hsl(221, 83%, 55%) 0%, transparent 70%)' }} />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full opacity-8" style={{ background: 'radial-gradient(circle, hsl(260, 70%, 50%) 0%, transparent 70%)' }} />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          <span className="text-xs font-medium text-white/70 tracking-wide">AI Consulting & Implementation</span>
        </div>

        <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.95] text-white mb-6">
          {title}
        </h1>

        {subtitle && (
          <p className="text-lg md:text-xl text-white/60 mb-10 max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        )}

        <div className="flex flex-wrap gap-4 justify-center">
          <Button size="lg" asChild className="h-12 px-8 text-base font-semibold bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25">
            <a href={ctaLink} className="inline-flex items-center gap-2">
              {ctaText}
              <ArrowRight className="w-4 h-4" />
            </a>
          </Button>
          {cta2Text && (
            <Button size="lg" variant="outline" asChild className="h-12 px-8 text-base font-semibold border-white/20 text-white bg-white/5 hover:bg-white/10 hover:border-white/30 backdrop-blur-sm">
              <a href={cta2Link ?? '#'}>{cta2Text}</a>
            </Button>
          )}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg className="w-5 h-5 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  )
}
