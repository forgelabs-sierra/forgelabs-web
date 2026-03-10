import type { Block } from '@/lib/shortcodes'
import { HeroSection } from '@/components/sections/hero'
import { FeaturesSection } from '@/components/sections/features'
import { ServicesSection } from '@/components/sections/services'
import { CTABanner } from '@/components/sections/cta-banner'
import { ContactForm } from '@/components/sections/contact-form'
import { MarkdownBlock } from '@/components/sections/markdown-block'
import React from 'react'

export function renderBlocks(blocks: Block[]): React.ReactNode[] {
  return blocks.map((block, i) => {
    switch (block.type) {
      case 'hero': return <HeroSection key={i} {...block.props} />
      case 'features': return <FeaturesSection key={i} {...block.props} />
      case 'services': return <ServicesSection key={i} {...block.props} />
      case 'cta': return <CTABanner key={i} {...block.props} />
      case 'contact': return <ContactForm key={i} {...block.props} />
      case 'markdown': return <MarkdownBlock key={i} content={block.content} />
      default: return null
    }
  })
}
