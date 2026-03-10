import { Button } from '@/components/ui/button'
import type { CTAProps } from '@/lib/shortcodes'
import { ArrowRight } from 'lucide-react'

export function CTABanner({ title, subtitle, button_text, button_link }: CTAProps) {
  return (
    <section className="relative py-28 overflow-hidden" style={{ background: 'linear-gradient(135deg, hsl(222, 47%, 8%) 0%, hsl(225, 50%, 12%) 50%, hsl(218, 45%, 10%) 100%)' }}>
      <div className="absolute inset-0 bg-grid-pattern opacity-40" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 opacity-20" style={{ background: 'radial-gradient(ellipse, hsl(221, 83%, 55%) 0%, transparent 70%)' }} />
      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white mb-4 leading-tight">
          {title}
        </h2>
        {subtitle && (
          <p className="text-lg text-white/60 mb-10 leading-relaxed">{subtitle}</p>
        )}
        {button_text && (
          <Button size="lg" asChild className="h-12 px-8 text-base font-semibold bg-white text-slate-900 hover:bg-white/90 shadow-lg">
            <a href={button_link ?? '#contact'} className="inline-flex items-center gap-2">
              {button_text}
              <ArrowRight className="w-4 h-4" />
            </a>
          </Button>
        )}
      </div>
    </section>
  )
}
