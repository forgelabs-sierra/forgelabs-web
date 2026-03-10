import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { AdminEditor } from "@/components/admin/admin-editor"

export default async function AdminPage() {
  const session = await auth()
  if (!session) redirect('/login')
  return <AdminEditor userEmail={session.user?.email ?? ''} />
}
