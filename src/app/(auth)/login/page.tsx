import { AuthForm } from '@/components/auth/AuthForm'
import { Moon, Sparkles } from 'lucide-react'

export default function LoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center hero-gradient py-12 px-4 relative overflow-hidden">
            {/* Star field background */}
            <div className="absolute inset-0 star-field opacity-50" />

            {/* Floating decorative elements */}
            <div className="absolute top-20 left-16 text-pink-400/20 float">
                <Moon className="h-12 w-12" />
            </div>
            <div className="absolute bottom-32 right-20 text-purple-400/20 float" style={{ animationDelay: '2s' }}>
                <Sparkles className="h-16 w-16" />
            </div>

            <div className="relative z-10">
                <AuthForm mode="login" />
            </div>
        </div>
    )
}
