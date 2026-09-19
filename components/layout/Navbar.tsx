'use client';

import React, { useState } from 'react';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import { Cake, Phone, MessageCircle, Menu, X, Clock, MapPin, Sparkles } from 'lucide-react';
import { generateGeneralWhatsAppUrl, getShopPhoneNumber } from '@/lib/whatsapp';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Cakes', href: '/cakes' },
    { name: 'Custom Cakes', href: '/custom-cakes' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  const whatsappUrl = generateGeneralWhatsAppUrl();
  const phone = getShopPhoneNumber();

  return (
    <header className="sticky top-0 z-40 bg-[#FDFBF7]/90 backdrop-blur-md border-b border-[#FAF5EE] shadow-xs transition-all">
      {/* Top micro banner for local trust */}
      <div className="bg-[#3E2313] text-[#FAF5EE] text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2 text-xs font-medium">
            <span className="inline-flex items-center gap-1 bg-[#D97706]/30 text-amber-200 px-2 py-0.5 rounded-full text-[11px]">
              <Sparkles className="w-3 h-3 text-amber-300" />
              100% Eggless Options
            </span>
            <span className="hidden sm:inline text-amber-100/80">
              • Freshly Baked Daily in Bhayandar East
            </span>
          </div>
          <div className="flex items-center space-x-4 text-[11px] text-amber-100/90">
            <span className="hidden md:flex items-center gap-1">
              <Clock className="w-3 h-3 text-amber-300" /> 9:00 AM – 11:30 PM
            </span>
            <a
              href={`tel:${phone}`}
              className="flex items-center gap-1 hover:text-white transition-colors font-medium"
            >
              <Phone className="w-3 h-3 text-amber-300" /> Call: {phone}
            </a>
          </div>
        </div>
      </div>

      {/* Main navigation bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <NextLink href="/" className="flex items-center space-x-3 group">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#3E2313] to-[#684128] flex items-center justify-center text-amber-200 shadow-md group-hover:scale-105 transition-transform duration-200">
              <Cake className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#2C180D] block leading-tight">
                Magic Cake Shop
              </span>
              <span className="text-[11px] uppercase tracking-wider font-semibold text-[#885637] flex items-center gap-1">
                <MapPin className="w-3 h-3 text-amber-600 inline" /> Bhayandar East
              </span>
            </div>
          </NextLink>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname?.startsWith(link.href));
              return (
                <NextLink
                  key={link.name}
                  href={link.href}
                  className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-[#3E2313] text-[#FDFBF7] shadow-xs'
                      : 'text-[#374151] hover:text-[#2C180D] hover:bg-[#FAF5EE]'
                  }`}
                >
                  {link.name}
                </NextLink>
              );
            })}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center space-x-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-emerald-600/30 text-emerald-700 bg-emerald-50/60 hover:bg-emerald-100 hover:border-emerald-500 text-sm font-semibold transition-all shadow-xs"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600 fill-emerald-600/20" />
              WhatsApp Us
            </a>

            <NextLink
              href="/cakes"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#3E2313] to-[#4A2E1B] text-amber-100 hover:text-white hover:from-[#2C180D] hover:to-[#3E2313] text-sm font-semibold shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
            >
              <Cake className="w-4 h-4 text-amber-300" />
              Order a Cake
            </NextLink>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex md:hidden items-center space-x-2">
            <NextLink
              href="/cakes"
              className="px-3 py-1.5 rounded-lg bg-[#3E2313] text-amber-100 text-xs font-semibold"
            >
              Order
            </NextLink>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-[#3E2313] hover:bg-[#FAF5EE] focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FDFBF7] border-b border-[#E7D5C7] px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname?.startsWith(link.href));
              return (
                <NextLink
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                    isActive
                      ? 'bg-[#3E2313] text-[#FDFBF7]'
                      : 'text-[#374151] hover:bg-[#FAF5EE]'
                  }`}
                >
                  {link.name}
                </NextLink>
              );
            })}
          </nav>

          <div className="pt-3 border-t border-[#FAF5EE] space-y-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-50 border border-emerald-600/30 text-emerald-700 text-sm font-semibold"
            >
              <MessageCircle className="w-5 h-5 text-emerald-600" />
              Chat on WhatsApp
            </a>
            <NextLink
              href="/cakes"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#3E2313] text-amber-100 text-sm font-semibold shadow-md"
            >
              <Cake className="w-5 h-5 text-amber-300" />
              Browse & Order Cake
            </NextLink>
          </div>

          <div className="text-center text-xs text-[#885637] pt-2">
            <p>Bhanu Park CHS, Navghar Road, Bhayandar East</p>
            <p className="font-medium mt-1">Open 9:00 AM – 11:30 PM Daily</p>
          </div>
        </div>
      )}
    </header>
  );
}
