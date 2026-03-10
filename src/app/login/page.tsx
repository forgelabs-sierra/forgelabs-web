import { Button } from "@/components/ui/button"
import { signIn } from "@/lib/auth"

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const params = await searchParams
  const isAccessDenied = params?.error === 'AccessDenied'

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30">
      <div className="max-w-sm w-full mx-4 bg-background rounded-lg border p-8 shadow-sm text-center">
        <h1 className="text-2xl font-bold mb-2">Forge Labs CMS</h1>
        <p className="text-muted-foreground mb-6 text-sm">Sign in with your Forge Labs Google account to access the admin panel.</p>
        {isAccessDenied && (
          <p className="text-destructive text-sm mb-4 p-3 bg-destructive/10 rounded">
            Access denied — this site is restricted to Forge Labs team members.
          </p>
        )}
        <form action={async () => {
          'use server'
          await signIn('google', { redirectTo: '/admin' })
        }}>
          <Button type="submit" className="w-full">Sign in with Google</Button>
        </form>
      </div>
    </div>
  )
}
