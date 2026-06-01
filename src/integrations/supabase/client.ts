import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = 'https://jyzotpamjmffvjrxfjwf.supabase.co';
const SUPABASE_PUBLISHABLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp5em90cGFtam1mZnZqcnhmandmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAzMjY5MjcsImV4cCI6MjA5NTkwMjkyN30.4n-sfcdC3we_ZL3Fr6t-pzOs483ntMKyi9hDplHhkFA';

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: typeof window !== 'undefined' ? localStorage : undefined,
    persistSession: true,
    autoRefreshToken: true,
  },
});
