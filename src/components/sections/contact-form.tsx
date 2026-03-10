import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import type { ContactProps } from '@/lib/shortcodes'
import { Mail, MapPin } from 'lucide-react'

export function ContactForm({ heading, address, email }: ContactProps) {
  return (
    <section id="contact" className="py-20 bg-muted/30">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold tracking-widest text-primary uppercase mb-2">Contact</p>
          <h2 className="text-4xl font-bold tracking-tight">{heading ?? 'Get in Touch'}</h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <form className="space-y-4">
            <Input placeholder="Your name" />
            <Input placeholder="Your email" type="email" />
            <Textarea placeholder="Your message" className="min-h-[150px]" />
            <Button type="submit" size="lg" className="w-full">Send Message</Button>
          </form>
          <div className="space-y-6 lg:pt-2">
            {email && (
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-primary mt-1 shrink-0" />
                <div>
                  <p className="font-medium">Email</p>
                  <a href={`mailto:${email}`} className="text-muted-foreground hover:text-primary">{email}</a>
                </div>
              </div>
            )}
            {address && (
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary mt-1 shrink-0" />
                <div>
                  <p className="font-medium">Address</p>
                  <p className="text-muted-foreground">{address}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
