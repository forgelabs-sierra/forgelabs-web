import type { TestimonialsProps } from '@/lib/shortcodes'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export function TestimonialsSection({ items }: TestimonialsProps) {
  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">What Our Clients Say</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <Card key={i} className="flex flex-col">
              <CardContent className="flex flex-col flex-1 pt-6">
                <div className="text-6xl text-primary/20 leading-none font-serif select-none mb-2">&ldquo;</div>
                <p className="italic text-muted-foreground flex-1 mb-6">{item.quote}</p>
                <div className="flex items-center gap-3">
                  <Avatar>
                    {item.avatar && <AvatarImage src={item.avatar} alt={item.author} />}
                    <AvatarFallback>
                      {item.author.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-sm">{item.author}</p>
                    {item.role && <p className="text-xs text-muted-foreground">{item.role}</p>}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
