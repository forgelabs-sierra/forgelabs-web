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
              <CardContent className="pt-6 pb-6 flex flex-col items-center text-center">
                {/* Circular photo */}
                <div className="w-28 h-28 rounded-full overflow-hidden mb-4 flex-shrink-0">
                  <Image
                    src={
                      member.image ||
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&size=400&background=475569&color=fff&bold=true`
                    }
                    alt={member.name}
                    width={112}
                    height={112}
                    className="object-cover w-full h-full"
                  />
                </div>

                {/* Name */}
                <p className="font-semibold text-lg leading-tight">{member.name}</p>

                {/* Role */}
                <p className="text-sm text-muted-foreground mt-1">{member.role}</p>

                {/* Bio */}
                {member.bio && (
                  <p className="text-sm text-slate-600 mt-3">{member.bio}</p>
                )}

                {/* LinkedIn */}
                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 text-muted-foreground hover:text-foreground transition-colors"
                    aria-label={`${member.name} on LinkedIn`}
                  >
                    {/* LinkedIn icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
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
