'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Menu } from 'lucide-react'
import { ThemeToggle } from './theme-toggle'

const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Team', href: '#team' },
  { label: 'Contact', href: '#contact' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/forgelabs-nz', external: true },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 transition-all duration-300">
      <div className="max-w-6xl mx-auto px-6 flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src="/logo.svg" 
            alt="Forge Labs" 
            className="h-8 w-8"
          />
          <span className={`
            font-semibold text-slate-900 transition-all duration-300 ease-in-out
            ${scrolled ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100 w-auto'}
          `}>
            Forge Labs
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map(l => (
            <a
              key={l.href}
              href={l.href}
              target={l.external ? '_blank' : undefined}
              rel={l.external ? 'noopener noreferrer' : undefined}
              className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors"
            >
              {l.label}
            </a>
          ))}
          <ThemeToggle />
          <Button size="sm" asChild className="h-9 px-4 font-semibold">
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
                <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-lg font-medium text-slate-700">{l.label}</a>
              ))}
              <Button asChild className="mt-2"><a href="#contact" onClick={() => setOpen(false)}>Get Started</a></Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
