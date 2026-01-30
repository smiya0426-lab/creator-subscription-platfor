import { AuthForm } from '@/components/auth/AuthForm'
import { Star, Moon } from 'lucide-react'

export default function RegisterPage() {
    return (
        <div className="min-h-screen flex items-center justify-center hero-gradient py-12 px-4 relative overflow-hidden">
            {/* Star field background */}
            <div className="absolute inset-0 star-field opacity-50" />

            {/* Floating decorative elements */}
            <div className="absolute top-32 right-16 text-yellow-400/20 float">
                <Star className="h-14 w-14" />
            </div>
            <div className="absolute bottom-20 left-20 text-purple-400/20 float" style={{ animationDelay: '3s' }}>
                <Moon className="h-10 w-10" />
            </div>

            <div className="relative z-10">
                <AuthForm mode="register" />
            </div>
        </div>
    )
}
