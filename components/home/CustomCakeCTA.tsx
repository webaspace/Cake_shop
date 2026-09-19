import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Palette, MessageCircle, ArrowRight, Sparkles } from 'lucide-react';
import { generateGeneralWhatsAppUrl } from '@/lib/whatsapp';

export default function CustomCakeCTA() {
  const customWhatsAppUrl = generateGeneralWhatsAppUrl(
    'Hi Magic Cake Shop, I would like to design a custom cake for an upcoming celebration. Can you share options and pricing?'
  );

  return (
    <section className="py-16 bg-[#2C180D] text-[#FAF5EE] relative overflow-hidden">
      {/* Decorative ambient lighting */}
      <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-amber-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -left-20 -top-20 w-96 h-96 bg-rose-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left: Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-xs border border-white/20 text-xs font-semibold text-amber-300">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Bespoke Bakery Designs</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Have Something Special in Mind?
            </h2>

            <p className="text-base sm:text-lg text-stone-300 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Tell us what you want and we’ll help create a cake for your celebration. From multi-tiered wedding masterpieces and themed cartoon fondant cakes to edible photo memories, our master bakers bring your dream cake to life.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                href="/custom-cakes"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-[#1D0F08] font-bold text-sm shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
              >
                <Palette className="w-4 h-4" />
                <span>Request a Custom Cake</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href={customWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-sm transition-all"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>Discuss on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Right: Custom cake showcase preview */}
          <div className="lg:col-span-5">
            <div className="relative aspect-4/3 sm:aspect-16/10 rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-[#3E2313]">
              <Image
                src="https://images.unsplash.com/photo-1535254973040-607b474cb50d?auto=format&fit=crop&w=1000&q=80"
                alt="Two tier floral wedding custom cake by Magic Cake Shop"
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-black/60 backdrop-blur-xs border border-white/10 text-xs">
                <span className="font-bold text-amber-300 block">Fondant, 2-Tier &amp; Photo Cakes</span>
                <span className="text-stone-300 text-[11px]">Send us any reference photo or idea from Pinterest or Instagram!</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
