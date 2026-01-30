import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2023-10-16',
    typescript: true,
})

export function getTierFromPriceId(priceId: string): number {
    if (priceId === process.env.STRIPE_PRICE_TIER1) return 1
    if (priceId === process.env.STRIPE_PRICE_TIER2) return 2
    return 0
}

export function getPriceIdFromTier(tier: number): string | null {
    switch (tier) {
        case 1:
            return process.env.STRIPE_PRICE_TIER1 || null
        case 2:
            return process.env.STRIPE_PRICE_TIER2 || null
        default:
            return null
    }
}
