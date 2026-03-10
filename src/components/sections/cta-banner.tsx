import Image from 'next/image'
import { Button } from '@/components/ui/button'
import type { CTAProps } from '@/lib/shortcodes'

export function CTABanner({ title, subtitle, image, overlay, button_text, button_link }: CTAProps) {
  const overlayClass = overlay === 'dark' ? 'bg-black/65' : 'bg-black/65'

  return (
    <section style={{ position: 'relative', padding: '8rem 0', overflow: 'hidden' }}>
      {image ? (
        <>
          <Image src={image} alt="CTA background" fill sizes="100vw" style={{ objectFit: 'cover', zIndex: 0 }} />
          <div style={{ position: 'absolute', inset: 0, zIndex: 1 }} className={overlayClass} />
        </>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5" />
      )}
      <div style={{ position: 'relative', zIndex: 2 }} className="max-w-3xl mx-auto px-6 text-center">
        <h2 className={`text-4xl md:text-5xl font-bold tracking-tight mb-4 ${image ? 'text-white' : ''}`}>
          {title}
        </h2>
        {subtitle && (
          <p className={`text-lg mb-8 ${image ? 'text-white/90' : 'text-muted-foreground'}`}>
            {subtitle}
          </p>
        )}
        {button_text && (
          <Button
            size="lg"
            asChild
            className={image ? 'bg-white text-gray-900 hover:bg-white/90 ring-2 ring-white/30 hover:ring-white/60' : ''}
          >
            <a href={button_link ?? '#contact'}>{button_text}</a>
          </Button>
        )}
      </div>
    </section>
  )
}
