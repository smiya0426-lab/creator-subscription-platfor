import { Star, Crown, Sparkles, Check, HelpCircle } from 'lucide-react'
import Link from 'next/link'

const plans = [
    {
        id: 0,
        name: 'フリー',
        price: 0,
        icon: Sparkles,
        gradient: 'from-blue-500 to-cyan-400',
        features: ['無料コンテンツの閲覧', 'コミュニティへの参加', 'お知らせ通知'],
    },
    {
        id: 1,
        name: 'ベーシック',
        price: 500,
        icon: Star,
        gradient: 'from-purple-500 to-indigo-500',
        popular: true,
        features: ['フリープランの全機能', 'ベーシック限定コンテンツ', '月2回の限定配信', 'コメント機能'],
    },
    {
        id: 2,
        name: 'プレミアム',
        price: 1000,
        icon: Crown,
        gradient: 'from-pink-500 to-rose-400',
        features: ['ベーシックの全機能', 'すべての限定コンテンツ', '週1回の限定配信', '優先サポート', '限定グッズ抽選'],
    },
]

export default function PricingPage() {
    return (
        <div className="relative">
            <div className="absolute inset-0 star-field opacity-30" />

            <div className="container py-20 relative z-10">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 mb-4">
                        <Star className="h-5 w-5 text-yellow-400" />
                        <span className="text-sm text-pink-300 uppercase tracking-widest font-medium">Pricing</span>
                    </div>
                    <h1 className="text-5xl font-bold mb-6 gradient-text">プランを選ぶ</h1>
                    <p className="text-lg text-purple-200/70 max-w-xl mx-auto">
                        あなたに合ったプランを選んで、限定コンテンツにアクセスしよう
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
                    {plans.map((plan) => {
                        const Icon = plan.icon
                        return (
                            <div
                                key={plan.id}
                                className={`relative glass border-pink-500/20 rounded-2xl overflow-hidden card-hover ${plan.popular ? 'border-purple-400/50 scale-105 z-10' : ''
                                    }`}
                            >
                                {plan.popular && (
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20">
                                        <span className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg inline-flex items-center">
                                            <Star className="h-3 w-3 mr-1" />
                                            人気No.1
                                        </span>
                                    </div>
                                )}

                                <div className="p-8 pt-10">
                                    <div className={`mx-auto mb-4 w-16 h-16 rounded-full bg-gradient-to-br ${plan.gradient} flex items-center justify-center glow-purple`}>
                                        <Icon className="h-8 w-8 text-white" />
                                    </div>

                                    <h3 className="text-2xl font-bold text-white text-center mb-2">{plan.name}</h3>

                                    <div className="text-center mb-8">
                                        <span className={`text-5xl font-black ${plan.price === 0 ? 'text-blue-400' : 'gradient-text'}`}>
                                            {plan.price === 0 ? '無料' : `¥${plan.price.toLocaleString()}`}
                                        </span>
                                        {plan.price > 0 && <span className="text-purple-300/60 ml-1">/月</span>}
                                    </div>

                                    <ul className="space-y-4 mb-8">
                                        {plan.features.map((feature, index) => (
                                            <li key={index} className="flex items-start gap-3">
                                                <div className={`mt-0.5 rounded-full p-1 shrink-0 bg-gradient-to-br ${plan.gradient} bg-opacity-20`}>
                                                    <Check className="h-3 w-3 text-white" />
                                                </div>
                                                <span className="text-purple-100 text-sm">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <button
                                        className={`w-full py-4 font-bold rounded-xl transition-all ${plan.popular
                                                ? 'btn-gradient text-white'
                                                : 'bg-white/10 hover:bg-white/20 text-white border border-pink-500/30'
                                            }`}
                                    >
                                        {plan.price === 0 ? '無料で始める' : 'このプランを選ぶ'}
                                    </button>
                                </div>
                            </div>
                        )
                    })}
                </div>

                <div className="mt-24">
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center gap-2 mb-4">
                            <HelpCircle className="h-5 w-5 text-purple-400" />
                            <span className="text-sm text-purple-300 uppercase tracking-widest font-medium">FAQ</span>
                        </div>
                        <h3 className="text-2xl font-bold text-white">よくある質問</h3>
                    </div>
                    <div className="max-w-2xl mx-auto space-y-4">
                        <div className="glass rounded-xl p-6 card-hover">
                            <h4 className="font-semibold text-white mb-2">解約はいつでも可能ですか？</h4>
                            <p className="text-sm text-purple-200/70">
                                はい、いつでも解約できます。解約後も契約期間の終了まではコンテンツを閲覧できます。
                            </p>
                        </div>
                        <div className="glass rounded-xl p-6 card-hover">
                            <h4 className="font-semibold text-white mb-2">プランの変更はできますか？</h4>
                            <p className="text-sm text-purple-200/70">
                                はい、マイページからプランの変更が可能です。アップグレード・ダウングレードどちらも対応しています。
                            </p>
                        </div>
                        <div className="glass rounded-xl p-6 card-hover">
                            <h4 className="font-semibold text-white mb-2">支払い方法は何がありますか？</h4>
                            <p className="text-sm text-purple-200/70">
                                クレジットカード（Visa、Mastercard、American Express、JCB）でお支払いいただけます。
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
