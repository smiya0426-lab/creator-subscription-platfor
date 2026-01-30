import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { stripe, getPriceIdFromTier } from '@/lib/stripe/client'

export async function POST(request: Request) {
    try {
        const supabase = await createClient()
        const { data: { user } } = await supabase.auth.getUser()

        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const { tier } = await request.json()
        const priceId = getPriceIdFromTier(tier)

        if (!priceId) {
            return NextResponse.json({ error: 'Invalid tier' }, { status: 400 })
        }

        // Get or create Stripe customer
        const adminClient = createAdminClient()
        const { data: profile } = await adminClient
            .from('profiles')
            .select('stripe_customer_id')
            .eq('id', user.id)
            .single()

        let customerId = profile?.stripe_customer_id

        if (!customerId) {
            const customer = await stripe.customers.create({
                email: user.email,
                metadata: {
                    supabase_user_id: user.id,
                },
            })
            customerId = customer.id

            // Save customer ID to profile
            await adminClient
                .from('profiles')
                .update({ stripe_customer_id: customerId })
                .eq('id', user.id)
        }

        // Create checkout session
        const session = await stripe.checkout.sessions.create({
            customer: customerId,
            line_items: [
                {
                    price: priceId,
                    quantity: 1,
                },
            ],
            mode: 'subscription',
            success_url: `${process.env.NEXT_PUBLIC_APP_URL}/mypage?success=true`,
            cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing?canceled=true`,
            subscription_data: {
                metadata: {
                    supabase_user_id: user.id,
                    tier: tier.toString(),
                },
            },
        })

        return NextResponse.json({ url: session.url })
    } catch (error: any) {
        console.error('Checkout error:', error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
