'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Cake,
  ShoppingBag,
  Package,
  MessageSquare,
  LayoutDashboard,
  LogOut,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';
import { checkAdminSession, logoutAdmin, AdminUser } from '@/lib/admin-auth';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [checking, setChecking] = useState(true);

  // If on login page, render children directly without admin layout wrapper
  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    if (isLoginPage) {
      setChecking(false);
      return;
    }

    async function verify() {
      const session = await checkAdminSession();
      if (!session) {
        router.push('/admin/login');
      } else {
        setAdminUser(session);
      }
      setChecking(false);
    }
    verify();
  }, [pathname, isLoginPage, router]);

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (checking) {
    return (
      <div className="min-h-screen bg-[#FAF5EE] flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="animate-spin w-8 h-8 border-4 border-[#3E2313] border-t-transparent rounded-full mx-auto" />
          <p className="text-xs text-stone-500 font-semibold">Verifying admin session...</p>
        </div>
      </div>
    );
  }

  const navItems = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Orders', href: '/admin/orders', icon: ShoppingBag },
    { name: 'Products', href: '/admin/products', icon: Package },
    { name: 'Reviews', href: '/admin/reviews', icon: MessageSquare },
  ];

  const handleLogout = async () => {
    await logoutAdmin();
    router.push('/admin/login');
  };

  return (
    <div className="min-h-screen bg-[#FAF5EE]/60 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-[#2C180D] text-white shrink-0 flex flex-col justify-between p-4 sm:p-6 border-r border-[#3E2313]">
        <div className="space-y-6">
          {/* Header / Logo */}
          <div className="flex items-center space-x-3 pb-4 border-b border-[#3E2313]">
            <div className="w-10 h-10 rounded-xl bg-amber-600/30 text-amber-300 flex items-center justify-center">
              <Cake className="w-6 h-6" />
            </div>
            <div>
              <span className="font-serif text-lg font-bold block leading-tight">
                Magic Cake Shop
              </span>
              <span className="text-[10px] text-amber-300/80 font-bold uppercase tracking-wider flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 inline" /> Admin Control
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors ${
                    isActive
                      ? 'bg-amber-600/30 text-amber-300 border border-amber-500/40'
                      : 'text-stone-300 hover:bg-[#3E2313] hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4 text-amber-400" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="pt-6 border-t border-[#3E2313] space-y-3">
          <div className="text-[11px] text-stone-400 truncate">
            Logged in as: <strong className="text-white block">{adminUser?.email}</strong>
          </div>

          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-stone-300 text-xs font-semibold transition-colors"
          >
            <span>Live Website</span>
            <ExternalLink className="w-3.5 h-3.5 text-stone-400" />
          </Link>

          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-rose-300 hover:bg-rose-900/20 text-xs font-bold transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Admin Content Area */}
      <main className="flex-1 p-4 sm:p-8 lg:p-10 max-w-7xl overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}
