import { parse as parseYaml } from 'yaml'

export type HeroProps = {
  title: string
  subtitle?: string
  cta?: string
  cta2?: string
  image?: string
  overlay?: 'dark' | 'light' | 'gradient'
}

export type FeatureItem = { title: string; description: string; icon?: string; image?: string }
export type FeaturesProps = { items: FeatureItem[] }

export type ServiceItem = { title: string; description: string; icon?: string }
export type ServicesProps = { items: ServiceItem[] }

export type CTAProps = {
  title: string
  subtitle?: string
  image?: string
  overlay?: string
  button_text?: string
  button_link?: string
}

export type ContactProps = {
  heading?: string
  address?: string
  email?: string
}

export type TestimonialItem = { quote: string; author: string; role?: string; avatar?: string }
export type TestimonialsProps = { items: TestimonialItem[] }

export type TeamMember = { name: string; role: string; image?: string; linkedin?: string }
export type TeamProps = { members: TeamMember[] }

export type CarouselSlide = { image: string; title?: string; subtitle?: string }
export type CarouselProps = { slides: CarouselSlide[] }

export type Block =
  | { type: 'markdown'; content: string }
  | { type: 'hero'; props: HeroProps }
  | { type: 'features'; props: FeaturesProps }
  | { type: 'services'; props: ServicesProps }
  | { type: 'cta'; props: CTAProps }
  | { type: 'contact'; props: ContactProps }
  | { type: 'testimonials'; props: TestimonialsProps }
  | { type: 'team'; props: TeamProps }
  | { type: 'carousel'; props: CarouselProps }

function parseAttrs(attrStr: string): Record<string, string> {
  const attrs: Record<string, string> = {}
  const regex = /(\w+)="([^"]*)"/g
  let match
  while ((match = regex.exec(attrStr)) !== null) {
    attrs[match[1]] = match[2]
  }
  return attrs
}

export function parseShortcodes(content: string): Block[] {
  const blocks: Block[] = []

  let lastIndex = 0
  const allMatches: Array<{ index: number; length: number; block: Block }> = []

  // Find block shortcodes first
  let m: RegExpExecArray | null
  const tempContent = content

  // Reset and find all matches with positions
  const blockRe = /\{\{(\w+)([^}]*)\}\}([\s\S]*?)\{\{\/\1\}\}/g
  while ((m = blockRe.exec(tempContent)) !== null) {
    const [full, name, attrStr, body] = m
    const attrs = parseAttrs(attrStr)
    let block: Block | null = null

    if (name === 'features' || name === 'services') {
      try {
        const parsed = parseYaml(body.trim()) as FeatureItem[] | ServiceItem[]
        if (name === 'features') {
          block = { type: 'features', props: { items: parsed as FeatureItem[] } }
        } else {
          block = { type: 'services', props: { items: parsed as ServiceItem[] } }
        }
      } catch {
        block = { type: 'markdown', content: body }
      }
    } else if (name === 'cta') {
      const body_parsed = body.trim() ? (parseYaml(body.trim()) as Record<string, string> || {}) : {}
      block = { type: 'cta', props: { ...attrs, ...body_parsed } as CTAProps }
    } else if (name === 'contact') {
      const body_parsed = body.trim() ? (parseYaml(body.trim()) as Record<string, string> || {}) : {}
      block = { type: 'contact', props: { ...attrs, ...body_parsed } as ContactProps }
    } else if (name === 'testimonials') {
      try {
        const parsed = parseYaml(body.trim()) as TestimonialItem[]
        block = { type: 'testimonials', props: { items: parsed } }
      } catch {
        block = { type: 'markdown', content: body }
      }
    } else if (name === 'team') {
      try {
        const parsed = parseYaml(body.trim()) as TeamMember[]
        block = { type: 'team', props: { members: parsed } }
      } catch {
        block = { type: 'markdown', content: body }
      }
    } else if (name === 'carousel') {
      try {
        const parsed = parseYaml(body.trim()) as CarouselSlide[]
        block = { type: 'carousel', props: { slides: parsed } }
      } catch {
        block = { type: 'markdown', content: body }
      }
    }

    if (block) {
      allMatches.push({ index: m.index, length: full.length, block })
    }
  }

  // Find self-closing shortcodes (that aren't already matched)
  const selfRe = /\{\{(\w+)([^}]*)\}\}/g
  while ((m = selfRe.exec(tempContent)) !== null) {
    const [full, name, attrStr] = m
    // Skip if this position is already covered by a block match
    const alreadyCovered = allMatches.some(
      bm => m!.index >= bm.index && m!.index < bm.index + bm.length
    )
    if (alreadyCovered) continue

    const attrs = parseAttrs(attrStr)
    let block: Block | null = null

    if (name === 'hero') {
      block = { type: 'hero', props: attrs as unknown as HeroProps }
    }

    if (block) {
      allMatches.push({ index: m.index, length: full.length, block })
    }
  }

  // Sort by position
  allMatches.sort((a, b) => a.index - b.index)

  // Build block array with markdown between
  lastIndex = 0
  for (const match of allMatches) {
    if (match.index > lastIndex) {
      const md = tempContent.slice(lastIndex, match.index).trim()
      if (md) blocks.push({ type: 'markdown', content: md })
    }
    blocks.push(match.block)
    lastIndex = match.index + match.length
  }

  // Remaining markdown
  const remaining = tempContent.slice(lastIndex).trim()
  if (remaining) blocks.push({ type: 'markdown', content: remaining })

  return blocks
}
