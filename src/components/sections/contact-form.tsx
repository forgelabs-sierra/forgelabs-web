'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import type { ContactProps } from '@/lib/shortcodes'
import { Mail, MapPin } from 'lucide-react'

// Google Apps Script webhook URL from the reference site
const FORM_ENDPOINT = 'https://script.google.com/macros/s/AKfycbyFs0-jMd4MTUavguk7whTWdMivk0q9mFZA8PEsliYHIJ5V4IEh8F2OuL9uZ3Ip_rJ-Lg/exec'

export function ContactForm({ heading, address, email }: ContactProps) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', message: '' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    try {
      await fetch(FORM_ENDPOINT, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          message: form.message,
        }),
      })
      setStatus('sent')
      setForm({ firstName: '', lastName: '', email: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="py-20 bg-muted/30">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold tracking-widest text-primary uppercase mb-2">Contact</p>
          <h2 className="text-4xl font-bold tracking-tight">{heading ?? 'Get in Touch'}</h2>
          <p className="text-muted-foreground mt-2">Get in touch with us to discuss how we can help your business.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <Input
                placeholder="First name"
                value={form.firstName}
                onChange={e => setForm(f => ({ ...f, firstName: e.target.value }))}
                required
              />
              <Input
                placeholder="Last name"
                value={form.lastName}
                onChange={e => setForm(f => ({ ...f, lastName: e.target.value }))}
                required
              />
            </div>
            <Input
              placeholder="Email address"
              type="email"
              value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              required
            />
            <Textarea
              placeholder="Your message"
              className="min-h-[150px]"
              value={form.message}
              onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
              required
            />
            <Button type="submit" size="lg" className="w-full" disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending...' : status === 'sent' ? 'Message sent ✓' : 'Send message'}
            </Button>
            {status === 'error' && (
              <p className="text-destructive text-sm text-center">Something went wrong. Please try emailing us directly.</p>
            )}
          </form>
          <div className="space-y-6 lg:pt-2">
            {email && (
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-primary mt-1 shrink-0" />
                <div>
                  <p className="font-medium">Email Us</p>
                  <a href={`mailto:${email}`} className="text-muted-foreground hover:text-primary">{email}</a>
                </div>
              </div>
            )}
            {address && (
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary mt-1 shrink-0" />
                <div>
                  <p className="font-medium">Our Location</p>
                  <p className="text-muted-foreground whitespace-pre-line">{address}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
