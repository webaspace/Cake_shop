'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Cake, Lock, Mail, AlertCircle, Sparkles, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { loginAdmin } from '@/lib/admin-auth';
import { isSupabaseConfigured } from '@/lib/supabase/client';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('admin@magiccakeshop.in');
  const [password, setPassword] = useState('admin123');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    try {
      const res = await loginAdmin(email.trim(), password);
      if (res.success) {
        router.push('/admin');
      } else {
        setErrorMsg(res.error || 'Invalid credentials');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Login error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF5EE] flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Top Back Link */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-600 hover:text-[#3E2313] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Magic Cake Shop</span>
          </Link>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl border border-[#E7D5C7] p-8 sm:p-10 shadow-xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-[#3E2313] text-amber-200 flex items-center justify-center mx-auto shadow-md">
              <Cake className="w-8 h-8 text-amber-300" />
            </div>
            <h1 className="font-serif text-2xl font-bold text-[#2C180D]">
              Bakery Admin Portal
            </h1>
            <p className="text-xs text-stone-500">
              Magic Cake Shop — Bhayandar East
            </p>
          </div>

          {/* Mode Indicator */}
          <div className="p-3 bg-[#FAF5EE] rounded-xl border border-[#E7D5C7] text-xs text-stone-600 flex items-center justify-between">
            <span className="font-medium">
              {isSupabaseConfigured ? 'Supabase Auth Mode' : 'Demo Mode Active'}
            </span>
            <span className="text-[11px] text-amber-800 font-semibold">
              {isSupabaseConfigured ? 'Connected' : 'Password: admin123'}
            </span>
          </div>

          {errorMsg && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-stone-700 block mb-1">
                Admin Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E7D5C7] text-xs focus:outline-none focus:ring-2 focus:ring-[#684128]/30"
                  placeholder="admin@magiccakeshop.in"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-stone-700 block mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E7D5C7] text-xs focus:outline-none focus:ring-2 focus:ring-[#684128]/30"
                  placeholder="Enter admin password"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl bg-[#3E2313] hover:bg-[#2C180D] text-amber-100 hover:text-white font-bold text-xs shadow-md transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <span>Signing in...</span>
              ) : (
                <>
                  <Lock className="w-3.5 h-3.5 text-amber-300" />
                  <span>Access Admin Dashboard</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
