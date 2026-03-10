'use client'

import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'
import { useCallback } from 'react'
import type { CarouselProps } from '@/lib/shortcodes'

export function CarouselSection({ slides }: CarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  if (!slides || slides.length === 0) return null

  return (
    <section className="relative w-full overflow-hidden">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {slides.map((slide, i) => (
            <div key={i} className="relative flex-[0_0_100%] min-w-0 h-[480px]">
              <Image
                src={slide.image}
                alt={slide.title ?? `Slide ${i + 1}`}
                fill
                className="object-cover"
                sizes="100vw"
                priority={i === 0}
              />
              {(slide.title || slide.subtitle) && (
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex flex-col justify-end p-8">
                  {slide.title && (
                    <h2 className="text-white text-3xl font-bold mb-2">{slide.title}</h2>
                  )}
                  {slide.subtitle && (
                    <p className="text-white/80 text-lg">{slide.subtitle}</p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Prev/next arrows */}
      <button
        onClick={scrollPrev}
        aria-label="Previous slide"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 rounded-full bg-black/50 hover:bg-black/70 text-white w-10 h-10 flex items-center justify-center transition-colors"
      >
        ‹
      </button>
      <button
        onClick={scrollNext}
        aria-label="Next slide"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 rounded-full bg-black/50 hover:bg-black/70 text-white w-10 h-10 flex items-center justify-center transition-colors"
      >
        ›
      </button>

      {/* Dot navigation */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => emblaApi?.scrollTo(i)}
            className="w-2 h-2 rounded-full bg-white/60 hover:bg-white transition-colors"
          />
        ))}
      </div>
    </section>
  )
}
