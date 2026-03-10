'use client'

import { Button } from '@/components/ui/button'

const TEMPLATES: { label: string; text: string }[] = [
  {
    label: '+ Hero',
    text: '{{hero title="Your Headline" subtitle="Your subtitle text." cta="Get Started|#contact" cta2="Learn More|#services" image="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80&auto=format" overlay="dark"}}\n',
  },
  {
    label: '+ Features',
    text: '{{features}}\n- title: Feature Name\n  description: Feature description text.\n  icon: star\n{{/features}}\n',
  },
  {
    label: '+ Services',
    text: '{{services}}\n- title: Service Name\n  description: Service description text.\n  icon: code\n{{/services}}\n',
  },
  {
    label: '+ CTA',
    text: '{{cta title="Ready to Get Started?" subtitle="Let\'s talk about how we can help."}}\nbutton_text: Schedule a Consultation\nbutton_link: "#contact"\n{{/cta}}\n',
  },
  {
    label: '+ Testimonials',
    text: '{{testimonials}}\n- quote: "This is a testimonial quote."\n  author: Name Surname\n  role: CEO, Company\n  avatar: https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80\n{{/testimonials}}\n',
  },
  {
    label: '+ Team',
    text: '{{team}}\n- name: Team Member\n  role: Job Title\n  bio: Short bio goes here.\n  image: https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80\n  linkedin: https://linkedin.com/in/username\n{{/team}}\n',
  },
  {
    label: '+ Carousel',
    text: '{{carousel}}\n- image: https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80&auto=format\n  title: Slide Title\n  subtitle: Slide subtitle text.\n- image: https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1920&q=80&auto=format\n  title: Second Slide\n  subtitle: Another subtitle.\n{{/carousel}}\n',
  },
  {
    label: '+ Contact',
    text: '{{contact}}\nheading: Get in Touch\naddress: The Saltworks, 4 Ash Street, Christchurch Central City, Christchurch 8011\nemail: cameron@forgelabs.nz\n{{/contact}}\n',
  },
]

interface ShortcodeToolbarProps {
  onInsert: (text: string) => void
}

export function ShortcodeToolbar({ onInsert }: ShortcodeToolbarProps) {
  return (
    <div className="flex items-center gap-2 px-4 py-2 border-b bg-background overflow-x-auto flex-shrink-0" style={{ height: '48px' }}>
      {TEMPLATES.map((t) => (
        <Button
          key={t.label}
          variant="outline"
          size="sm"
          onClick={() => onInsert(t.text)}
          className="whitespace-nowrap text-xs"
        >
          {t.label}
        </Button>
      ))}
    </div>
  )
}
