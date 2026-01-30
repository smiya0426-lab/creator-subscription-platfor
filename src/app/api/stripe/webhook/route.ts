import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import Stripe from 'stripe'
import { stripe, getTierFromPriceId } from '@/lib/stripe/client'
import { createAdminClient } from '@/lib/supabase/admin'

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

async function upsertSubscription(subscription: Stripe.Subscription, userId: string) {
    const supabase = createAdminClient()

    const priceId = subscription.items.data[0]?.price.id
    const tier = getTierFromPriceId(priceId || '')

    const subscriptionData = {
        user_id: userId,
        stripe_subscription_id: subscription.id,
        stripe_price_id: priceId,
        status: subscription.status,
        tier,
        current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
        current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
        cancel_at_period_end: subscription.cancel_at_period_end,
        updated_at: new Date().toISOString(),
    }

    const { error } = await supabase
        .from('subscriptions')
        .upsert(subscriptionData, { onConflict: 'user_id' })

    if (error) {
        console.error('Error upserting subscription:', error)
        throw error
    }
}

async function deleteSubscription(userId: string) {
    const supabase = createAdminClient()

    const { error } = await supabase
        .from('subscriptions')
        .update({
            status: 'canceled',
            tier: 0,
            updated_at: new Date().toISOString(),
        })
        .eq('user_id', userId)

    if (error) {
        console.error('Error deleting subscription:', error)
        throw error
    }
}

export async function POST(request: Request) {
    const body = await request.text()
    const headersList = await headers()
    const signature = headersList.get('stripe-signature')

    if (!signature) {
        return NextResponse.json({ error: 'Missing signature' }, { status: 400 })
    }

    let event: Stripe.Event

    try {
        event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
    } catch (error: any) {
        console.error('Webhook signature verification failed:', error.message)
        return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
    }

    try {
        switch (event.type) {
            case 'checkout.session.completed': {
                const session = event.data.object as Stripe.Checkout.Session
                const subscriptionId = session.subscription as string
                const userId = session.metadata?.supabase_user_id ||
                    ((await stripe.subscriptions.retrieve(subscriptionId)).metadata.supabase_user_id)

                if (subscriptionId && userId) {
                    const subscription = await stripe.subscriptions.retrieve(subscriptionId)
                    await upsertSubscription(subscription, userId)
                }
                break
            }

            case 'customer.subscription.updated': {
                const subscription = event.data.object as Stripe.Subscription
                const userId = subscription.metadata.supabase_user_id

                if (userId) {
                    await upsertSubscription(subscription, userId)
                }
                break
            }

            case 'customer.subscription.deleted': {
                const subscription = event.data.object as Stripe.Subscription
                const userId = subscription.metadata.supabase_user_id

                if (userId) {
                    await deleteSubscription(userId)
                }
                break
            }

            case 'invoice.payment_failed': {
                const invoice = event.data.object as Stripe.Invoice
                const subscriptionId = invoice.subscription as string

                if (subscriptionId) {
                    const subscription = await stripe.subscriptions.retrieve(subscriptionId)
                    const userId = subscription.metadata.supabase_user_id

                    if (userId) {
                        const supabase = createAdminClient()
                        await supabase
                            .from('subscriptions')
                            .update({
                                status: 'past_due',
                                updated_at: new Date().toISOString(),
                            })
                            .eq('user_id', userId)
                    }
                }
                break
            }
        }

        return NextResponse.json({ received: true })
    } catch (error: any) {
        console.error('Webhook processing error:', error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
