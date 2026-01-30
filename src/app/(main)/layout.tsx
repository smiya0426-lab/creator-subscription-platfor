import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { getUser, isAdmin } from '@/lib/supabase/server'

export default async function MainLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const user = await getUser()
    const admin = await isAdmin()

    return (
        <div className="flex min-h-screen flex-col">
            <Header user={user} isAdmin={admin} />
            <main className="flex-1">{children}</main>
            <Footer />
        </div>
    )
}
