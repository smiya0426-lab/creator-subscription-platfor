import { getUserWithSubscription } from '@/lib/supabase/server'
import { PricingClient } from './PricingClient'
import { Sparkles, HelpCircle, Star } from 'lucide-react'

export default async function PricingPage() {
    const { user, currentTier } = await getUserWithSubscription()

    return (
        <div className="relative">
            {/* Background effects */}
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

                <PricingClient currentTier={currentTier} userId={user?.id || null} />

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
