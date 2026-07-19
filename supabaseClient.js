import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = () => {
    return (
        supabaseUrl &&
        supabaseUrl !== 'https://your-project-id.supabase.co' &&
        supabaseUrl.trim() !== '' &&
        supabaseAnonKey &&
        supabaseAnonKey !== 'your-anon-key-here' &&
        supabaseAnonKey.trim() !== ''
    );
};

export const supabase = createClient(
    isSupabaseConfigured() ? supabaseUrl : 'https://placeholder.supabase.co',
    isSupabaseConfigured() ? supabaseAnonKey : 'placeholder-anon-key'
);
