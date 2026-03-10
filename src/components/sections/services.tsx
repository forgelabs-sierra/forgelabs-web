import { Card, CardContent, CardHeader } from '@/components/ui/card'
import type { ServicesProps } from '@/lib/shortcodes'
import {
  Map, Code, FileSearch, Bot, Server, Mail,
  Search, BarChart3, Kanban, Lightbulb, Star
} from 'lucide-react'

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  map: Map,
  code: Code,
  'file-search': FileSearch,
  bot: Bot,
  server: Server,
  mail: Mail,
  search: Search,
  'bar-chart-3': BarChart3,
  kanban: Kanban,
  lightbulb: Lightbulb,
  star: Star,
}

export function ServicesSection({ items }: ServicesProps) {
  return (
    <section id="services" className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-4">
          <p className="text-sm font-semibold tracking-widest text-primary uppercase mb-2">What We Do</p>
          <h2 className="text-5xl font-bold tracking-tight">Our Services</h2>
        </div>
        <div className="w-16 h-1 bg-primary mx-auto mt-4 mb-12 rounded-full" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, i) => {
            const Icon = ICONS[item.icon ?? 'star'] ?? Star
            return (
              <Card key={i} className="hover:border-l-4 hover:border-l-primary hover:shadow-md transition-all duration-300 group">
                <CardHeader>
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-3">{item.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
