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
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-primary mb-3">Why Forge Labs</p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900">How We Work</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map((item, i) => {
            const Icon = ICONS[item.icon ?? 'star'] ?? Star
            return (
              <div key={i} className="relative p-8 rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-200 group">
                <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center mb-5 shadow-sm shadow-primary/20 group-hover:scale-110 transition-transform duration-200">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-slate-500 leading-relaxed">{item.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
