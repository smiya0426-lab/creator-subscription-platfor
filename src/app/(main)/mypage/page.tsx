import { redirect } from 'next/navigation'
import { getUserWithSubscription } from '@/lib/supabase/server'
import { MypageClient } from './MypageClient'

export default async function MypagePage() {
    const { user, profile, subscription, currentTier } = await getUserWithSubscription()

    if (!user) {
        redirect('/login')
    }

    return (
        <div className="container py-8">
            <h1 className="text-3xl font-bold mb-8">マイページ</h1>

            <MypageClient
                profile={profile}
                subscription={subscription}
                currentTier={currentTier}
                email={user.email || ''}
            />
        </div>
    )
}
