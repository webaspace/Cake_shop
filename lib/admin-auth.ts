import { supabase, isSupabaseConfigured } from '@/lib/supabase/client';

const DEMO_ADMIN_KEY = 'mcs_demo_admin_auth';

export interface AdminUser {
  email: string;
  role: string;
}

export async function checkAdminSession(): Promise<AdminUser | null> {
  if (typeof window === 'undefined') return null;

  if (isSupabaseConfigured && supabase) {
    try {
      const { data } = await supabase.auth.getSession();
      if (data?.session?.user) {
        return {
          email: data.session.user.email || 'admin@magiccakeshop.in',
          role: 'admin',
        };
      }
    } catch (err) {
      console.warn('Supabase auth session error:', err);
    }
  }

  // Fallback / Demo session check
  const demoAuth = localStorage.getItem(DEMO_ADMIN_KEY);
  if (demoAuth) {
    try {
      return JSON.parse(demoAuth);
    } catch (e) {
      return null;
    }
  }

  return null;
}

export async function loginAdmin(email: string, password: string): Promise<{ success: boolean; error?: string }> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        return { success: false, error: error.message };
      }
      if (data.user) {
        return { success: true };
      }
    } catch (err: any) {
      return { success: false, error: err.message || 'Supabase authentication failed' };
    }
  }

  // Demo fallback mode (Accept standard demo credentials or any test email)
  if (password === 'admin123' || password === 'magic123' || password.length >= 6) {
    const user: AdminUser = { email, role: 'admin' };
    localStorage.setItem(DEMO_ADMIN_KEY, JSON.stringify(user));
    return { success: true };
  }

  return { success: false, error: 'Invalid admin credentials. Use password "admin123" for demo mode.' };
}

export async function logoutAdmin(): Promise<void> {
  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.auth.signOut();
    } catch (err) {
      console.warn('Supabase signOut error:', err);
    }
  }
  if (typeof window !== 'undefined') {
    localStorage.removeItem(DEMO_ADMIN_KEY);
  }
}
