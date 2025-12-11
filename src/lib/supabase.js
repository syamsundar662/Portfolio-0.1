import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://zxhfsfrzwrcedqnpqglp.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_nvP9oXN99nSEJVeSYullww_lFwqJoM1'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
