import { readFileSync } from 'fs'
import { join } from 'path'
import { parseShortcodes } from '@/lib/shortcodes'
import { renderBlocks } from '@/lib/renderer'
import { SiteHeader } from '@/components/layout/site-header'
import { SiteFooter } from '@/components/layout/site-footer'

export default function Home() {
  const content = readFileSync(join(process.cwd(), 'content/home.md'), 'utf-8')
  const blocks = parseShortcodes(content)
  const sections = renderBlocks(blocks)

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1">{sections}</main>
      <SiteFooter />
    </div>
  )
}
