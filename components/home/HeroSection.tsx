import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Cake, MessageCircle, ArrowRight, Star, Sparkles, ShieldCheck, Heart } from 'lucide-react';
import { generateGeneralWhatsAppUrl } from '@/lib/whatsapp';

export default function HeroSection() {
  const whatsappUrl = generateGeneralWhatsAppUrl();

  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:py-20 bg-gradient-to-b from-[#FAF5EE] via-[#FDFBF7] to-[#FDFBF7]">
      {/* Decorative subtle backdrop elements */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-amber-100/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-rose-100/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Copy & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E7D5C7] shadow-xs text-xs font-semibold text-[#684128]">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Bhayandar East’s Favorite Local Bakery</span>
              <span className="w-1 h-1 rounded-full bg-[#684128]" />
              <span className="text-emerald-700 font-bold">100% Eggless Available</span>
            </div>

            {/* Headline */}
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#2C180D] tracking-tight leading-[1.15]">
              Fresh Cakes Made for Your{' '}
              <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#684128] via-amber-700 to-amber-600">
                Special Moments
              </span>
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-[#4B5563] leading-relaxed max-w-2xl mx-auto lg:mx-0 font-normal">
              Delicious cakes for birthdays, celebrations, anniversaries and every moment worth celebrating. Baked fresh every morning with pure ingredients, authentic Belgian chocolate, and personalized hand decorations.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                href="/cakes"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-gradient-to-r from-[#3E2313] to-[#684128] hover:from-[#2C180D] hover:to-[#4A2E1B] text-amber-100 hover:text-white text-base font-bold shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
                id="hero-btn-browse"
              >
                <Cake className="w-5 h-5 text-amber-300" />
                Browse Cakes
                <ArrowRight className="w-4 h-4 text-amber-300" />
              </Link>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-base font-bold shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
                id="hero-btn-whatsapp"
              >
                <MessageCircle className="w-5 h-5 fill-white/20" />
                Order on WhatsApp
              </a>
            </div>

            {/* Social proof & Local confidence */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-stone-600 border-t border-[#FAF5EE]">
              <div className="flex items-center gap-1.5">
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="font-bold text-[#2C180D]">4.9 / 5</span>
                <span className="text-stone-500">(500+ happy celebrations)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Navghar Road &amp; Mira-Bhayandar Delivery</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Cake Visual with Floating Badges */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Card */}
              <div className="relative aspect-4/5 sm:aspect-square w-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-[#FAF5EE]">
                <Image
                  src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1000&q=85"
                  alt="Dutch Chocolate Truffle Cake by Magic Cake Shop Bhayandar East"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transform hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Bottom Overlay Info */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-white/40 shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700 block">
                        Today’s Signature
                      </span>
                      <h4 className="font-serif text-base font-bold text-[#2C180D]">
                        Dutch Chocolate Truffle Cake
                      </h4>
                      <p className="text-[11px] text-stone-500">
                        100% Eggless • Belgian Ganache • Freshly Baked
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-stone-400 block">From</span>
                      <span className="text-lg font-bold text-[#3E2313]">₹550</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Badge 1: Eggless Guarantee */}
              <div className="absolute -top-4 -left-3 sm:-left-6 bg-white rounded-2xl p-3 shadow-xl border border-[#E7D5C7] flex items-center gap-2.5 animate-in zoom-in-50 duration-500">
                <span className="veg-badge">
                  <span className="veg-badge-dot"></span>
                </span>
                <div>
                  <div className="text-xs font-bold text-[#2C180D]">Pure Veg Kitchen</div>
                  <div className="text-[10px] text-stone-500">Eggless cakes available</div>
                </div>
              </div>

              {/* Floating Badge 2: Local Delivery */}
              <div className="absolute -bottom-4 -right-3 sm:-right-6 bg-white rounded-2xl p-3 shadow-xl border border-[#E7D5C7] flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center text-amber-800">
                  <Heart className="w-4 h-4 fill-amber-600 text-amber-600" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#2C180D]">Same-Day Delivery</div>
                  <div className="text-[10px] text-stone-500">In Bhayandar &amp; Mira Rd</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
