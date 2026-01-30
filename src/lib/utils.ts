import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function formatDate(date: string | Date): string {
    return new Intl.DateTimeFormat('ja-JP', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }).format(new Date(date))
}

export function formatPrice(price: number): string {
    return new Intl.NumberFormat('ja-JP', {
        style: 'currency',
        currency: 'JPY',
    }).format(price)
}

export function getTierName(tier: number): string {
    switch (tier) {
        case 0:
            return '無料'
        case 1:
            return 'プランA'
        case 2:
            return 'プランB'
        default:
            return '不明'
    }
}

export function getTierColor(tier: number): string {
    switch (tier) {
        case 0:
            return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100'
        case 1:
            return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100'
        case 2:
            return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100'
        default:
            return 'bg-gray-100 text-gray-800'
    }
}

export function canAccessContent(userTier: number, requiredTier: number): boolean {
    return userTier >= requiredTier
}

export function getAbsoluteUrl(path: string): string {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
    return `${baseUrl}${path}`
}
