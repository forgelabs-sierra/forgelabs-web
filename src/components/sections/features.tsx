import { Card, CardContent, CardHeader } from '@/components/ui/card'
import type { FeaturesProps } from '@/lib/shortcodes'
import { Brain, Users, ShieldCheck, Star } from 'lucide-react'

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  brain: Brain,
  users: Users,
  'shield-check': ShieldCheck,
  star: Star,
}

export function FeaturesSection({ items }: FeaturesProps) {
  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold tracking-widest text-primary uppercase mb-2">Why Forge Labs</p>
          <h2 className="text-4xl font-bold tracking-tight">How We Work</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map((item, i) => {
            const Icon = ICONS[item.icon ?? 'star'] ?? Star
            return (
              <Card key={i} className="hover:-translate-y-1 hover:shadow-lg transition-all duration-300 border-t-4 border-t-primary">
                <CardHeader>
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-4">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
