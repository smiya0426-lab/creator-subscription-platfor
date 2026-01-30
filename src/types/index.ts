export * from './database'

export interface TierInfo {
    id: number
    name: string
    price: number
    priceId: string
    features: string[]
}

export const TIERS: TierInfo[] = [
    {
        id: 0,
        name: '無料会員',
        price: 0,
        priceId: '',
        features: ['無料コンテンツの閲覧', 'コミュニティへのアクセス'],
    },
    {
        id: 1,
        name: 'プランA',
        price: 500,
        priceId: process.env.STRIPE_PRICE_TIER1 || '',
        features: [
            '無料コンテンツの閲覧',
            'プランA限定コンテンツ',
            '月1回の限定配信',
        ],
    },
    {
        id: 2,
        name: 'プランB',
        price: 1000,
        priceId: process.env.STRIPE_PRICE_TIER2 || '',
        features: [
            'すべてのコンテンツ閲覧',
            '高画質ダウンロード',
            '限定ライブ配信',
            '優先サポート',
        ],
    },
]
