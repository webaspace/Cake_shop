import React from 'react';
import { Sparkles, Palette, MapPin, CheckCircle2 } from 'lucide-react';

export default function TrustSection() {
  const trustPillars = [
    {
      icon: Sparkles,
      title: 'Freshly Made',
      description: 'Baked fresh daily on order. Never frozen sponge, using high quality butter, creams, and real fruits.',
    },
    {
      icon: Palette,
      title: 'Custom Cakes',
      description: 'Photo cakes, tiered wedding designs, and fondant themes custom-crafted for your celebrations.',
    },
    {
      icon: MapPin,
      title: 'Local Delivery',
      description: 'Prompt hand-delivery across Bhayandar East, Navghar, Golden Nest, Jesal Park, and Mira Road.',
    },
    {
      icon: CheckCircle2,
      title: 'Easy Ordering',
      description: 'Zero complicated checkout. Quick online request with direct WhatsApp & call confirmation.',
    },
  ];

  return (
    <section className="py-12 bg-white border-y border-[#E7D5C7]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {trustPillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="flex items-start space-x-4 p-4 rounded-2xl bg-[#FAF5EE]/40 hover:bg-[#FAF5EE] transition-colors border border-transparent hover:border-[#E7D5C7]"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#3E2313] text-amber-200 flex items-center justify-center shrink-0 shadow-xs">
                  <Icon className="w-6 h-6 text-amber-300" />
                </div>
                <div>
                  <h3 className="font-serif text-base font-bold text-[#2C180D] mb-1">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-stone-500 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
