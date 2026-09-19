import React from 'react';
import { Cake, Send, CheckCircle } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      num: '01',
      icon: Cake,
      title: 'Choose Your Cake',
      desc: 'Browse our menu of chocolate truffles, exotic fruit gateaux, or design a custom photo cake in your preferred weight.',
    },
    {
      num: '02',
      icon: Send,
      title: 'Send Your Order',
      desc: 'Fill out our quick order form with your message on the cake, date, time, and whether you need home delivery or store pickup.',
    },
    {
      num: '03',
      icon: CheckCircle,
      title: 'We Confirm & Prepare',
      desc: 'Our bakery team contacts you immediately via WhatsApp or phone call to finalize pricing, payment, and deliver it fresh.',
    },
  ];

  return (
    <section className="py-16 bg-[#FDFBF7] border-b border-[#E7D5C7]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-800 block mb-1">
            Simple &amp; Hassle-Free
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-extrabold text-[#2C180D] tracking-tight">
            How It Works
          </h2>
          <p className="text-sm text-stone-500 mt-2">
            Getting your celebratory cake is effortless in 3 simple steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="relative bg-white rounded-2xl p-6 border border-[#E7D5C7]/80 shadow-xs flex flex-col items-center text-center group hover:shadow-md transition-all"
              >
                {/* Step Number badge */}
                <div className="absolute -top-3 left-6 px-2.5 py-0.5 rounded-full bg-[#3E2313] text-amber-200 text-xs font-bold font-mono">
                  STEP {step.num}
                </div>

                <div className="w-14 h-14 rounded-2xl bg-[#FAF5EE] text-[#3E2313] flex items-center justify-center my-3 group-hover:scale-110 transition-transform">
                  <Icon className="w-7 h-7 text-amber-700" />
                </div>

                <h3 className="font-serif text-lg font-bold text-[#2C180D] mb-2">
                  {step.title}
                </h3>
                <p className="text-xs text-stone-500 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
