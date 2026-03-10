import { Octokit } from '@octokit/rest'
import { auth } from '@/lib/auth'

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN })
const GITHUB_BRANCH = process.env.GITHUB_BRANCH || 'main'

export async function GET() {
  const session = await auth()
  if (!session) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const { data } = await octokit.repos.getContent({
      owner: process.env.GITHUB_OWNER!,
      repo: process.env.GITHUB_REPO!,
      path: 'public/images',
      ref: GITHUB_BRANCH,
    })
    if (!Array.isArray(data)) return Response.json([])
    const images = data
      .filter(f => f.type === 'file' && /\.(jpe?g|png|gif|webp|svg)$/i.test(f.name))
      .map(f => ({ name: f.name, url: `/images/${f.name}`, downloadUrl: f.download_url }))
    return Response.json(images)
  } catch (e: unknown) {
    if ((e as { status?: number }).status === 404) return Response.json([])
    return Response.json({ error: 'Failed to list images' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  const session = await auth()
  if (!session) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const { filename } = await request.json()
  if (!filename) return Response.json({ error: 'filename required' }, { status: 400 })

  try {
    // Get current SHA of the file
    const { data } = await octokit.repos.getContent({
      owner: process.env.GITHUB_OWNER!,
      repo: process.env.GITHUB_REPO!,
      path: `public/images/${filename}`,
      ref: GITHUB_BRANCH,
    })
    if (!('sha' in data)) return Response.json({ error: 'File not found' }, { status: 404 })

    await octokit.repos.deleteFile({
      owner: process.env.GITHUB_OWNER!,
      repo: process.env.GITHUB_REPO!,
      path: `public/images/${filename}`,
      message: `Delete image: ${filename} — ${session.user?.email}`,
      sha: data.sha,
      branch: GITHUB_BRANCH,
    })
    return Response.json({ success: true })
  } catch (e: unknown) {
    if ((e as { status?: number }).status === 404) return Response.json({ error: 'File not found' }, { status: 404 })
    return Response.json({ error: 'Failed to delete image' }, { status: 500 })
  }
}
