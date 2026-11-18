import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  // Si estamos en el servidor (SSR/Build), devolvemos null para no romper el build
  if (typeof window === 'undefined') {
    return null as any;
  }

  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
  )
}
