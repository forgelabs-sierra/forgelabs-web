'use client'
import { Separator } from '@/components/ui/separator'

export function SiteFooter() {
  return (
    <footer className="border-t bg-muted/20">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.svg" alt="Forge Labs" style={{ height: '32px', width: 'auto', marginBottom: '1rem' }} />
            <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
              Empowering businesses to stay competitive through practical AI adoption and automation strategies that enhance human capabilities and drive measurable results.
            </p>
            <a
              href="https://www.linkedin.com/company/forgelabs-nz"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-4 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              LinkedIn
            </a>
          </div>
          <div>
            <p className="font-semibold mb-4">Services</p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#services" className="hover:text-foreground transition-colors">AI Strategy &amp; Roadmap</a></li>
              <li><a href="#services" className="hover:text-foreground transition-colors">Agentic AI Development</a></li>
              <li><a href="#services" className="hover:text-foreground transition-colors">Enterprise AI Deployment</a></li>
              <li><a href="#services" className="hover:text-foreground transition-colors">Developer Productivity</a></li>
            </ul>
          </div>
          <div>
            <p className="font-semibold mb-4">Contact</p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="mailto:cameron@forgelabs.nz" className="hover:text-foreground transition-colors">cameron@forgelabs.nz</a></li>
              <li>The Saltworks, 4 Ash Street</li>
              <li>Christchurch, New Zealand</li>
              <li className="pt-2"><a href="#contact" className="hover:text-foreground transition-colors font-medium text-foreground">Get in touch →</a></li>
            </ul>
          </div>
        </div>
        <Separator />
        <div className="flex flex-col md:flex-row justify-between items-center mt-6 gap-4">
          <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} Forge Labs. All rights reserved.</p>
          <a href="#" onClick={(e: React.MouseEvent<HTMLAnchorElement>) => { e.preventDefault(); window.scrollTo({top:0,behavior:'smooth'}) }} className="text-xs text-muted-foreground hover:text-foreground transition-colors">↑ Back to top</a>
        </div>
      </div>
    </footer>
  )
}
