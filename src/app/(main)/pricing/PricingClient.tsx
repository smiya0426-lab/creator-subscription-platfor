'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { PricingCard } from '@/components/subscription/PricingCard'
import { TIERS } from '@/types'

interface PricingClientProps {
    currentTier: number
    userId: string | null
}

export function PricingClient({ currentTier, userId }: PricingClientProps) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    const handleSubscribe = async (tier: number) => {
        if (!userId) {
            router.push('/login?redirect=/pricing')
            return
        }

        if (tier === 0) {
            // Free tier - no action needed
            return
        }

        setLoading(true)
        try {
            const response = await fetch('/api/stripe/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ tier }),
            })

            const data = await response.json()
            if (data.url) {
                window.location.href = data.url
            }
        } catch (error) {
            console.error('Checkout error:', error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
            {TIERS.map((tier) => (
                <PricingCard
                    key={tier.id}
                    tier={tier}
                    currentTier={currentTier}
                    isPopular={tier.id === 1}
                    onSubscribe={handleSubscribe}
                    loading={loading}
                />
            ))}
        </div>
    )
}
