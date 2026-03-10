import Image from 'next/image'
import { Button } from '@/components/ui/button'
import type { HeroProps } from '@/lib/shortcodes'

export function HeroSection({ title, subtitle, cta, cta2, image, overlay }: HeroProps) {
  const [ctaText, ctaLink] = cta?.split('|') ?? ['Get Started', '#contact']
  const [cta2Text, cta2Link] = cta2?.split('|') ?? []

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {image && (
        <>
          <Image
            src={image}
            alt="Hero background"
            fill
            className="object-cover"
            priority
          />
          <div className={`absolute inset-0 ${
            overlay === 'dark' ? 'bg-black/60' :
            overlay === 'light' ? 'bg-white/60' :
            overlay === 'gradient' ? 'bg-gradient-to-t from-black/80 to-transparent' :
            'bg-black/50'
          }`} />
        </>
      )}
      {!image && (
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10" />
      )}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <h1 className={`text-5xl md:text-7xl font-bold tracking-tighter mb-6 ${image ? 'text-white' : ''}`}>
          {title}
        </h1>
        {subtitle && (
          <p className={`text-xl md:text-2xl mb-10 max-w-2xl mx-auto ${image ? 'text-white/90' : 'text-muted-foreground'}`}>
            {subtitle}
          </p>
        )}
        <div className="flex flex-wrap gap-4 justify-center">
          <Button size="lg" asChild>
            <a href={ctaLink}>{ctaText}</a>
          </Button>
          {cta2Text && (
            <Button size="lg" variant="outline" asChild className={image ? 'border-white text-white hover:bg-white/20 hover:text-white' : ''}>
              <a href={cta2Link}>{cta2Text}</a>
            </Button>
          )}
        </div>
      </div>
    </section>
  )
}
