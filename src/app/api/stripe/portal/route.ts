import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { stripe } from '@/lib/stripe/client'

export async function POST() {
    try {
        const supabase = await createClient()
        const { data: { user } } = await supabase.auth.getUser()

        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        // Get Stripe customer ID
        const adminClient = createAdminClient()
        const { data: profile } = await adminClient
            .from('profiles')
            .select('stripe_customer_id')
            .eq('id', user.id)
            .single()

        if (!profile?.stripe_customer_id) {
            return NextResponse.json({ error: 'No subscription found' }, { status: 404 })
        }

        // Create customer portal session
        const session = await stripe.billingPortal.sessions.create({
            customer: profile.stripe_customer_id,
            return_url: `${process.env.NEXT_PUBLIC_APP_URL}/mypage`,
        })

        return NextResponse.json({ url: session.url })
    } catch (error: any) {
        console.error('Portal error:', error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
