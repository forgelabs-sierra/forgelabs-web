import { Octokit } from '@octokit/rest'
import { auth } from '@/lib/auth'

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN })
const GITHUB_BRANCH = process.env.GITHUB_BRANCH || 'main'

export async function POST(request: Request) {
  const session = await auth()
  if (!session) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const { filename, content } = await request.json() as { filename: string; content: string }

  if (!filename || !content) {
    return Response.json({ error: 'Missing filename or content' }, { status: 400 })
  }

  // Helper to attempt the upload with a given filename
  async function attemptUpload(name: string): Promise<Response> {
    const path = `public/images/${name}`
    try {
      await octokit.repos.createOrUpdateFileContents({
        owner: process.env.GITHUB_OWNER!,
        repo: process.env.GITHUB_REPO!,
        path,
        message: `Upload image: ${name}`,
        content, // already base64
        branch: GITHUB_BRANCH,
        committer: {
          name: session!.user?.name || 'CMS Admin',
          email: session!.user?.email || 'admin@forgelabs.nz',
        },
      })
      return Response.json({ url: `/images/${name}` })
    } catch (e: unknown) {
      const status = (e as { status?: number }).status
      if (status === 422 || status === 409) {
        // File already exists — retry with timestamp
        const dot = name.lastIndexOf('.')
        const base = dot !== -1 ? name.slice(0, dot) : name
        const ext = dot !== -1 ? name.slice(dot) : ''
        const ts = Date.now()
        const newName = `${base}-${ts}${ext}`
        const retryPath = `public/images/${newName}`
        await octokit.repos.createOrUpdateFileContents({
          owner: process.env.GITHUB_OWNER!,
          repo: process.env.GITHUB_REPO!,
          path: retryPath,
          message: `Upload image: ${newName}`,
          content,
          branch: GITHUB_BRANCH,
          committer: {
            name: session!.user?.name || 'CMS Admin',
            email: session!.user?.email || 'admin@forgelabs.nz',
          },
        })
        return Response.json({ url: `/images/${newName}` })
      }
      throw e
    }
  }

  try {
    return await attemptUpload(filename)
  } catch {
    return Response.json({ error: 'Failed to upload image' }, { status: 500 })
  }
}
