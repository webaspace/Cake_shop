'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Palette, Sparkles, MessageCircle, Send, ShieldCheck, Heart, Camera } from 'lucide-react';
import { generateCustomCakeWhatsAppUrl } from '@/lib/whatsapp';

export default function CustomCakeForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [occasion, setOccasion] = useState('Birthday Celebration');
  const [weight, setWeight] = useState('1.5 kg (Serves 15-18)');
  const [flavor, setFlavor] = useState('Dutch Chocolate Truffle');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [area, setArea] = useState('Bhayandar East');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const url = generateCustomCakeWhatsAppUrl({
      name,
      phone,
      themeOrOccasion: occasion,
      approxWeight: weight,
      flavor,
      preferredDate: date,
      deliveryArea: area,
      description,
    });
    window.open(url, '_blank');
  };

  const galleryExamples = [
    {
      title: 'Two-Tier Floral Wedding Cake',
      desc: 'Ivory buttercream with fresh cascading roses and gold foil.',
      img: 'https://images.unsplash.com/photo-1535254973040-607b474cb50d?auto=format&fit=crop&w=600&q=80',
    },
    {
      title: 'Kids Superhero & Cartoon Fondant',
      desc: 'Handcrafted edible 3D characters, vibrant colors.',
      img: 'https://images.unsplash.com/photo-1558301211-0d8c8ddee6ec?auto=format&fit=crop&w=600&q=80',
    },
    {
      title: 'Edible HD Photo Celebration Cake',
      desc: 'High-res memory print on 100% edible sugar icing sheet.',
      img: 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&w=600&q=80',
    },
    {
      title: 'Royal Indian Fusion Rasmalai Cake',
      desc: 'Kesar rabdi, fresh rasmalai, crushed pistachio & rose petals.',
      img: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=600&q=80',
    },
  ];

  return (
    <div className="py-12 sm:py-16 bg-[#FDFBF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Page Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#FAF5EE] border border-[#E7D5C7] text-xs font-bold text-amber-800">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Custom &amp; Designer Cakes</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-[#2C180D] tracking-tight">
            Design Your Dream Celebration Cake
          </h1>
          <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
            Have a photo from Pinterest, Instagram, or a custom sketch? Our master bakers in Bhayandar East handcraft bespoke 2-tier wedding cakes, kids theme cakes, and customized photo cakes tailored to your vision.
          </p>
        </div>

        {/* Inspiration Gallery */}
        <div className="space-y-6">
          <h2 className="font-serif text-2xl font-bold text-[#2C180D] text-center sm:text-left">
            Custom Cake Inspiration
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {galleryExamples.map((item, idx) => (
              <div
                key={idx}
                className="group bg-white rounded-2xl overflow-hidden border border-[#E7D5C7] shadow-xs hover:shadow-lg transition-all"
              >
                <div className="relative aspect-4/3 overflow-hidden bg-[#FAF5EE]">
                  <Image
                    src={item.img}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-serif text-base font-bold text-[#2C180D] mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-stone-500 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Enquiry Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 bg-white rounded-3xl p-6 sm:p-10 border border-[#E7D5C7] shadow-md">
          {/* Left Column: Form info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-800">
              <Palette className="w-4 h-4 text-amber-600" />
              <span>Step-by-Step Customization</span>
            </div>
            <h3 className="font-serif text-2xl font-extrabold text-[#2C180D] leading-tight">
              Tell Us What You Want &amp; We’ll Craft It
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Submit your preferred theme, flavor, and event date. Once submitted, our head baker directly connects with you on WhatsApp to view reference photos, advise sponge flavors, and give an all-inclusive estimate.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-[#FAF5EE] border border-[#E7D5C7] text-xs text-stone-700">
                <Camera className="w-5 h-5 text-amber-700 shrink-0" />
                <span>You can share reference photos directly on WhatsApp right after submitting!</span>
              </div>
              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-[#FAF5EE] border border-[#E7D5C7] text-xs text-stone-700">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>100% vegetarian &amp; eggless kitchen available for all custom designs.</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Neha Varma"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E7D5C7] text-xs focus:outline-none focus:ring-2 focus:ring-[#684128]/30"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">
                    Phone &amp; WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="10-digit mobile number"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E7D5C7] text-xs focus:outline-none focus:ring-2 focus:ring-[#684128]/30"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">
                    Occasion / Event
                  </label>
                  <select
                    value={occasion}
                    onChange={(e) => setOccasion(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E7D5C7] bg-white text-xs text-[#2C180D]"
                  >
                    <option value="1st Birthday">1st Birthday Celebration</option>
                    <option value="Kids Theme Birthday">Kids Themed Birthday</option>
                    <option value="Wedding / Engagement">Wedding / Engagement / Reception</option>
                    <option value="Anniversary">Romantic Anniversary</option>
                    <option value="Photo Cake">Edible Photo Cake</option>
                    <option value="Corporate Event">Corporate / Office Celebration</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">
                    Approximate Weight
                  </label>
                  <select
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E7D5C7] bg-white text-xs text-[#2C180D]"
                  >
                    <option value="1 kg (Serves 8-12)">1.0 kg (Serves 8-12)</option>
                    <option value="1.5 kg (Serves 15-18)">1.5 kg (Serves 15-18)</option>
                    <option value="2.0 kg (Serves 20-25)">2.0 kg (Serves 20-25)</option>
                    <option value="3.0 kg 2-Tier (Serves 30-35)">3.0 kg 2-Tier (Serves 30-35)</option>
                    <option value="4+ kg Grand Celebration">4+ kg Grand Celebration</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">
                    Preferred Flavor
                  </label>
                  <select
                    value={flavor}
                    onChange={(e) => setFlavor(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E7D5C7] bg-white text-xs text-[#2C180D]"
                  >
                    <option value="Dutch Chocolate Truffle">Dutch Chocolate Truffle</option>
                    <option value="Royal Rasmalai Fusion">Royal Rasmalai Fusion</option>
                    <option value="Red Velvet Cream Cheese">Red Velvet Cream Cheese</option>
                    <option value="Fresh Seasonal Fruit">Fresh Seasonal Fruit</option>
                    <option value="Lotus Biscoff Caramel">Lotus Biscoff Caramel</option>
                    <option value="Butterscotch Praline">Butterscotch Praline</option>
                    <option value="Open to Recommendation">Open to Baker Recommendation</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">
                    Celebration Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E7D5C7] bg-white text-xs text-[#2C180D]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">
                  Locality / Area for Delivery / Pickup
                </label>
                <input
                  type="text"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  placeholder="e.g. Navghar Road, Bhayandar East (or Pickup)"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E7D5C7] text-xs focus:outline-none focus:ring-2 focus:ring-[#684128]/30"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">
                  Describe Your Dream Cake Idea
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Mention colors, text on cake, characters, theme (e.g. Peppa Pig, Marvel Avengers, Pastel Pink Floral, etc.)..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E7D5C7] text-xs focus:outline-none focus:ring-2 focus:ring-[#684128]/30"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                id="btn-custom-cake-whatsapp"
              >
                <MessageCircle className="w-5 h-5 fill-white/20" />
                <span>Submit &amp; Chat on WhatsApp with Baker</span>
              </button>

              <p className="text-[11px] text-stone-500 text-center">
                Clicking opens WhatsApp with your pre-filled custom cake request ready to send.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
