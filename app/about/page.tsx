import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Cake, Sparkles, Heart, ShieldCheck, Clock, MapPin, Award, Users } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Our Bakery | Magic Cake Shop Bhayandar East',
  description:
    'Learn about Magic Cake Shop in Bhayandar East. Our commitment to 100% pure vegetarian, eggless baking, fresh daily ingredients, and handcrafted celebration cakes.',
};

export default function AboutPage() {
  const values = [
    {
      icon: Sparkles,
      title: 'Fresh Daily Sponge',
      desc: 'We never freeze sponges. Every single cake base is baked from scratch every morning in our local kitchen.',
    },
    {
      icon: Heart,
      title: '100% Eggless Mastery',
      desc: 'Our pure vegetarian cakes are celebrated across Bhayandar for their ultra-soft, moist texture without using gelatins or eggs.',
    },
    {
      icon: ShieldCheck,
      title: 'Uncompromising Hygiene',
      desc: 'Strict bakery sanitation, food-grade edible colors, and premium Belgian chocolate truffle and dairy cream.',
    },
    {
      icon: Award,
      title: 'Local Craftsmanship',
      desc: 'Dedicated to serving families across Bhayandar East, Navghar Road, Golden Nest, and Mira Road with warm local care.',
    },
  ];

  return (
    <div className="py-12 sm:py-16 bg-[#FDFBF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#FAF5EE] border border-[#E7D5C7] text-xs font-bold text-amber-800">
              <Cake className="w-3.5 h-3.5 text-amber-600" />
              <span>Our Story &amp; Values</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-[#2C180D] tracking-tight leading-tight">
              Baking Joy for Bhayandar’s Most Cherished Celebrations
            </h1>
            <p className="text-base text-stone-600 leading-relaxed">
              At <strong>Magic Cake Shop</strong>, we believe every milestone—from a baby’s first tooth to a grandparent’s 75th jubilee—deserves a cake baked with honest love, genuine ingredients, and artistic care.
            </p>
            <p className="text-sm text-stone-600 leading-relaxed">
              Established in the heart of Bhayandar East at Bhanu Park CHS on Navghar Road, we set out to solve a common problem: commercial supermarket cakes that are frozen for days with artificial flavors. Instead, we created a neighbourhood bakery dedicated to daily freshness, rich Belgian ganache, artisanal Indian fusion flavors like Royal Rasmalai, and pure eggless cakes that delight every family member.
            </p>

            <div className="pt-2 flex flex-wrap gap-4 text-xs font-bold text-[#2C180D]">
              <div className="flex items-center gap-2 p-3 rounded-xl bg-white border border-[#E7D5C7]">
                <MapPin className="w-4 h-4 text-amber-700" />
                <span>Navghar Road, Bhayandar East</span>
              </div>
              <div className="flex items-center gap-2 p-3 rounded-xl bg-white border border-[#E7D5C7]">
                <Clock className="w-4 h-4 text-amber-700" />
                <span>Open 9:00 AM – 11:30 PM Daily</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative aspect-4/5 rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-[#FAF5EE]">
              <Image
                src="https://images.unsplash.com/photo-1556911073-38141963c9e0?auto=format&fit=crop&w=1000&q=80"
                alt="Bakers preparing fresh cakes at Magic Cake Shop"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Core Values */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800 block mb-1">
              What Sets Us Apart
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-extrabold text-[#2C180D] tracking-tight">
              The Magic Cake Promise
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <div
                  key={i}
                  className="bg-white rounded-2xl p-6 border border-[#E7D5C7] shadow-xs hover:shadow-md transition-all flex flex-col items-center text-center space-y-3"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#FAF5EE] text-[#3E2313] flex items-center justify-center">
                    <Icon className="w-6 h-6 text-amber-700" />
                  </div>
                  <h3 className="font-serif text-base font-bold text-[#2C180D]">
                    {v.title}
                  </h3>
                  <p className="text-xs text-stone-500 leading-relaxed">
                    {v.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA Banner */}
        <div className="bg-[#3E2313] text-[#FAF5EE] rounded-3xl p-8 sm:p-12 text-center space-y-6">
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-white tracking-tight">
            Ready to Celebrate with Magic Cake Shop?
          </h2>
          <p className="text-sm text-stone-300 max-w-xl mx-auto">
            Explore our daily catalogue of signature cakes or send an enquiry directly to our team via WhatsApp.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <Link
              href="/cakes"
              className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 text-stone-950 font-bold text-sm shadow-md hover:shadow-lg transition-all"
            >
              Browse Cake Menu
            </Link>
            <Link
              href="/contact"
              className="px-8 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-sm transition-all"
            >
              Visit Our Shop
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
