import { Octokit } from '@octokit/rest'
import { parseShortcodes } from '@/lib/shortcodes'
import { renderBlocks } from '@/lib/renderer'
import { SiteHeader } from '@/components/layout/site-header'
import { SiteFooter } from '@/components/layout/site-footer'

// Force SSR — fetch fresh content on every request
export const dynamic = 'force-dynamic'

async function getContent(): Promise<string> {
  try {
    const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN })
    const { data } = await octokit.repos.getContent({
      owner: process.env.GITHUB_OWNER!,
      repo: process.env.GITHUB_REPO!,
      path: 'content/home.md',
      ref: process.env.GITHUB_BRANCH || 'main',
    })
    if ('content' in data) {
      return Buffer.from(data.content, 'base64').toString('utf-8')
    }
  } catch (e) {
    console.error('Failed to fetch content from GitHub, falling back to local file', e)
  }

  // Fallback to local file (local dev without env vars)
  const { readFileSync } = await import('fs')
  const { join } = await import('path')
  return readFileSync(join(process.cwd(), 'content/home.md'), 'utf-8')
}

export default async function Home() {
  const content = await getContent()
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
