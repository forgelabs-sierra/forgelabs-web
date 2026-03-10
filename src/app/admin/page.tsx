import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function AdminPage() {
  const session = await auth()
  if (!session) redirect('/login')

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="border-b bg-background px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <a href="/" className="text-sm text-muted-foreground hover:text-foreground">← Back to site</a>
          <h1 className="font-bold">Forge Labs CMS</h1>
        </div>
        <p className="text-sm text-muted-foreground">{session.user?.email}</p>
      </header>
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-background rounded-lg border p-8 text-center">
          <h2 className="text-xl font-semibold mb-2">CMS Editor</h2>
          <p className="text-muted-foreground">Full editor coming soon. You are signed in as {session.user?.email}.</p>
        </div>
      </main>
    </div>
  )
}
