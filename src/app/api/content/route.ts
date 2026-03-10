import { Octokit } from "@octokit/rest"
import { auth } from "@/lib/auth"

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN })
const GITHUB_BRANCH = process.env.GITHUB_BRANCH || 'main'

export async function GET() {
  const session = await auth()
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 })

  try {
    const { data } = await octokit.repos.getContent({
      owner: process.env.GITHUB_OWNER!,
      repo: process.env.GITHUB_REPO!,
      path: "content/home.md",
      ref: GITHUB_BRANCH,
    })
    if ("content" in data) {
      return Response.json({
        content: Buffer.from(data.content, "base64").toString("utf-8"),
        sha: data.sha,
      })
    }
    return Response.json({ error: "File not found" }, { status: 404 })
  } catch {
    return Response.json({ error: "Failed to fetch content" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  const session = await auth()
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 })

  const { content, sha } = await request.json()
  try {
    const result = await octokit.repos.createOrUpdateFileContents({
      owner: process.env.GITHUB_OWNER!,
      repo: process.env.GITHUB_REPO!,
      path: "content/home.md",
      message: `Update homepage content — ${session.user?.email}`,
      content: Buffer.from(content).toString("base64"),
      sha,
      branch: GITHUB_BRANCH,
      committer: {
        name: session.user?.name || "CMS Admin",
        email: session.user?.email || "admin@forgelabs.nz",
      },
    })
    return Response.json({ success: true, commitSha: result.data.commit.sha })
  } catch (e: unknown) {
    const status = (e as { status?: number }).status
    if (status === 409) {
      return Response.json({ error: "Conflict — content was modified" }, { status: 409 })
    }
    return Response.json({ error: "Failed to save content" }, { status: 500 })
  }
}
