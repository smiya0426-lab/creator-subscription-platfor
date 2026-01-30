export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export interface Database {
    public: {
        Tables: {
            profiles: {
                Row: {
                    id: string
                    email: string
                    display_name: string | null
                    avatar_url: string | null
                    stripe_customer_id: string | null
                    is_admin: boolean
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id: string
                    email: string
                    display_name?: string | null
                    avatar_url?: string | null
                    stripe_customer_id?: string | null
                    is_admin?: boolean
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    email?: string
                    display_name?: string | null
                    avatar_url?: string | null
                    stripe_customer_id?: string | null
                    is_admin?: boolean
                    created_at?: string
                    updated_at?: string
                }
            }
            posts: {
                Row: {
                    id: string
                    created_at: string
                    updated_at: string
                    title: string
                    content: string | null
                    image_urls: string[] | null
                    thumbnail_url: string | null
                    min_tier: number
                    is_published: boolean
                    author_id: string | null
                }
                Insert: {
                    id?: string
                    created_at?: string
                    updated_at?: string
                    title: string
                    content?: string | null
                    image_urls?: string[] | null
                    thumbnail_url?: string | null
                    min_tier?: number
                    is_published?: boolean
                    author_id?: string | null
                }
                Update: {
                    id?: string
                    created_at?: string
                    updated_at?: string
                    title?: string
                    content?: string | null
                    image_urls?: string[] | null
                    thumbnail_url?: string | null
                    min_tier?: number
                    is_published?: boolean
                    author_id?: string | null
                }
            }
            subscriptions: {
                Row: {
                    id: string
                    user_id: string
                    stripe_subscription_id: string | null
                    stripe_price_id: string | null
                    status: string
                    tier: number
                    current_period_start: string | null
                    current_period_end: string | null
                    cancel_at_period_end: boolean
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    user_id: string
                    stripe_subscription_id?: string | null
                    stripe_price_id?: string | null
                    status?: string
                    tier?: number
                    current_period_start?: string | null
                    current_period_end?: string | null
                    cancel_at_period_end?: boolean
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    user_id?: string
                    stripe_subscription_id?: string | null
                    stripe_price_id?: string | null
                    status?: string
                    tier?: number
                    current_period_start?: string | null
                    current_period_end?: string | null
                    cancel_at_period_end?: boolean
                    created_at?: string
                    updated_at?: string
                }
            }
        }
        Views: {
            [_ in never]: never
        }
        Functions: {
            [_ in never]: never
        }
        Enums: {
            [_ in never]: never
        }
    }
}

// Convenience types
export type Profile = Database['public']['Tables']['profiles']['Row']
export type Post = Database['public']['Tables']['posts']['Row']
export type Subscription = Database['public']['Tables']['subscriptions']['Row']

export type NewPost = Database['public']['Tables']['posts']['Insert']
export type UpdatePost = Database['public']['Tables']['posts']['Update']

// Extended types with relations
export interface PostWithAccess extends Post {
    hasAccess: boolean
}

export interface UserWithSubscription extends Profile {
    subscription: Subscription | null
    currentTier: number
}
