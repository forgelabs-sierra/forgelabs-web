import type { TeamProps } from '@/lib/shortcodes'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'

export function TeamSection({ members }: TeamProps) {
  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Our Team</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {members.map((member, i) => (
            <Card key={i} className="overflow-hidden">
              <div className="relative aspect-square">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover rounded-t-lg"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
              </div>
              <CardContent className="pt-4 pb-4">
                <p className="font-semibold">{member.name}</p>
                <p className="text-sm text-muted-foreground">{member.role}</p>
                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-primary hover:underline mt-1 inline-block"
                  >
                    LinkedIn ↗
                  </a>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
