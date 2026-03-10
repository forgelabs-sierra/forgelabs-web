import Image from 'next/image'
import { Button } from '@/components/ui/button'
import type { HeroProps } from '@/lib/shortcodes'

export function HeroSection({ title, subtitle, cta, cta2, image, overlay }: HeroProps) {
  const [ctaText, ctaLink] = cta?.split('|') ?? ['Get Started', '#contact']
  const [cta2Text, cta2Link] = cta2?.split('|') ?? []

  const overlayClass =
    overlay === 'dark' ? 'bg-black/60' :
    overlay === 'light' ? 'bg-white/60' :
    overlay === 'gradient' ? 'bg-gradient-to-t from-black/80 to-transparent' :
    'bg-black/50'

  return (
    <section style={{ position: 'relative', minHeight: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
      {image ? (
        <>
          <Image
            src={image}
            alt="Hero background"
            fill
            sizes="100vw"
            style={{ objectFit: 'cover', zIndex: 0 }}
            priority
          />
          <div style={{ position: 'absolute', inset: 0, zIndex: 1 }} className={overlayClass} />
        </>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10" />
      )}
      <div style={{ position: 'relative', zIndex: 2 }} className="max-w-4xl mx-auto px-6 text-center">
        <h1 className={`text-5xl md:text-7xl font-bold tracking-tighter mb-6 leading-[1.1] text-balance ${image ? 'text-white' : ''}`}>
          {title}
        </h1>
        {subtitle && (
          <p className={`text-xl md:text-2xl mb-10 max-w-3xl mx-auto ${image ? 'text-white/80' : 'text-muted-foreground'}`}>
            {subtitle}
          </p>
        )}
        <div className="flex flex-wrap gap-4 justify-center">
          <Button size="lg" asChild className="px-10 py-6 text-base">
            <a href={ctaLink}>{ctaText}</a>
          </Button>
          {cta2Text && (
            <Button
              size="lg"
              variant="outline"
              asChild
              className={`px-10 py-6 text-base ${image ? 'border-white text-white bg-transparent hover:bg-white/20 hover:text-white' : ''}`}
            >
              <a href={cta2Link ?? '#'}>{cta2Text}</a>
            </Button>
          )}
        </div>
      </div>
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-10">
        <svg className="w-6 h-6 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  )
}
