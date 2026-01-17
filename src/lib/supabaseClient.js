import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Check if credentials are configured
const isConfigured = supabaseUrl && supabaseAnonKey &&
    !supabaseUrl.includes('your-project-id') &&
    !supabaseAnonKey.includes('your-anon-key')

// Create client only if configured (will be null otherwise)
export const supabase = isConfigured
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null

export const isSupabaseConfigured = isConfigured
