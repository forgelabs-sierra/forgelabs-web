import { Separator } from '@/components/ui/separator'

export function SiteFooter() {
  return (
    <footer className="border-t bg-muted/20">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <p className="font-bold text-lg mb-2">Forge Labs</p>
            <p className="text-sm text-muted-foreground">Practical AI solutions for modern businesses in New Zealand and beyond.</p>
          </div>
          <div>
            <p className="font-semibold mb-3">Company</p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#services" className="hover:text-foreground">Services</a></li>
              <li><a href="#contact" className="hover:text-foreground">Contact</a></li>
            </ul>
          </div>
          <div>
            <p className="font-semibold mb-3">Contact</p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>cameron@forgelabs.nz</li>
              <li>Christchurch, New Zealand</li>
            </ul>
          </div>
        </div>
        <Separator />
        <p className="text-xs text-muted-foreground text-center mt-6">
          © {new Date().getFullYear()} Forge Labs. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
