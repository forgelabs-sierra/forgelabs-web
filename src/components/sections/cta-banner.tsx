import Image from 'next/image'
import { Button } from '@/components/ui/button'
import type { CTAProps } from '@/lib/shortcodes'

export function CTABanner({ title, subtitle, image, overlay, button_text, button_link }: CTAProps) {
  return (
    <section className="relative py-24 overflow-hidden">
      {image && (
        <>
          <Image src={image} alt="CTA background" fill className="object-cover" />
          <div className={`absolute inset-0 ${overlay === 'dark' ? 'bg-black/60' : 'bg-black/50'}`} />
        </>
      )}
      {!image && (
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5" />
      )}
      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <h2 className={`text-4xl md:text-5xl font-bold tracking-tight mb-4 ${image ? 'text-white' : ''}`}>
          {title}
        </h2>
        {subtitle && (
          <p className={`text-lg mb-8 ${image ? 'text-white/90' : 'text-muted-foreground'}`}>
            {subtitle}
          </p>
        )}
        {button_text && (
          <Button size="lg" asChild variant={image ? 'secondary' : 'default'}>
            <a href={button_link ?? '#contact'}>{button_text}</a>
          </Button>
        )}
      </div>
    </section>
  )
}
