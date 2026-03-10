'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Menu } from 'lucide-react'

const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Contact', href: '#contact' },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-6xl mx-auto px-6 flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.svg" alt="Forge Labs" height={36} style={{ height: '36px', width: 'auto' }} />
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map(l => (
            <a key={l.href} href={l.href} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              {l.label}
            </a>
          ))}
          <Button size="sm" asChild>
            <a href="#contact">Get Started</a>
          </Button>
        </nav>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon"><Menu className="h-5 w-5" /></Button>
          </SheetTrigger>
          <SheetContent>
            <SheetTitle className="sr-only">Navigation</SheetTitle>
            <nav className="flex flex-col gap-4 mt-8">
              {navLinks.map(l => (
                <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-lg font-medium">{l.label}</a>
              ))}
              <Button asChild><a href="#contact" onClick={() => setOpen(false)}>Get Started</a></Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
