import React from 'react';
import type { Metadata } from 'next';
import { MapPin, Phone, MessageCircle, Navigation, Clock, Truck, ShieldCheck, Mail } from 'lucide-react';
import { generateGeneralWhatsAppUrl, getShopPhoneNumber } from '@/lib/whatsapp';

export const metadata: Metadata = {
  title: 'Contact & Location | Magic Cake Shop Bhayandar East',
  description:
    'Contact Magic Cake Shop on Navghar Road, Bhayandar East. Phone: +91 98765 43210, WhatsApp ordering, directions on Google Maps, and bakery timings.',
};

export default function ContactPage() {
  const phone = getShopPhoneNumber();
  const whatsappUrl = generateGeneralWhatsAppUrl();
  const googleMapsUrl = 'https://maps.google.com/?q=Bhanu+Park+CHS+Navghar+Road+Bhayandar+East+401105';

  return (
    <div className="py-12 sm:py-16 bg-[#FDFBF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
            We’d Love to Hear From You
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-[#2C180D] tracking-tight">
            Contact &amp; Visit Us
          </h1>
          <p className="text-sm text-stone-600">
            Reach out directly for cake inquiries, custom designs, same-day delivery status, or visit our bakery counter on Navghar Road.
          </p>
        </div>

        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Phone Card */}
          <div className="bg-white rounded-2xl p-6 border border-[#E7D5C7] shadow-xs flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
                <Phone className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#2C180D]">Call Us Directly</h3>
              <p className="text-xs text-stone-500">
                Speak directly with our cake specialists for urgent cake orders and flavour consultations.
              </p>
              <div className="text-sm font-bold text-[#3E2313] pt-1">{phone}</div>
            </div>
            <a
              href={`tel:${phone}`}
              className="w-full py-2.5 px-4 rounded-xl bg-[#FAF5EE] text-[#3E2313] hover:bg-[#3E2313] hover:text-white text-xs font-bold text-center transition-colors"
            >
              Call Now
            </a>
          </div>

          {/* WhatsApp Card */}
          <div className="bg-white rounded-2xl p-6 border border-emerald-200 shadow-xs flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <MessageCircle className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#2C180D]">WhatsApp Ordering</h3>
              <p className="text-xs text-stone-500">
                Send us reference photos, confirm delivery charges, and receive quick order confirmations.
              </p>
              <div className="text-xs font-bold text-emerald-700 pt-1">
                Active 9:00 AM – 11:30 PM
              </div>
            </div>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 text-xs font-bold text-center transition-colors shadow-xs"
            >
              Chat on WhatsApp
            </a>
          </div>

          {/* Location Card */}
          <div className="bg-white rounded-2xl p-6 border border-[#E7D5C7] shadow-xs flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#2C180D]">Bakery Counter</h3>
              <p className="text-xs text-stone-500 leading-relaxed">
                Bhanu Park CHS, Navghar Road,<br />
                Bhayandar East, Maharashtra 401105
              </p>
              <div className="text-xs text-stone-500 pt-1">
                Open Daily: <strong>9:00 AM – 11:30 PM</strong>
              </div>
            </div>
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 rounded-xl bg-[#3E2313] text-amber-100 hover:bg-[#2C180D] text-xs font-bold text-center transition-colors"
            >
              Get Directions on Maps
            </a>
          </div>
        </div>

        {/* Delivery Details & Disclaimer Banner */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E7D5C7] shadow-sm space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#3E2313] text-amber-200 flex items-center justify-center">
              <Truck className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold text-[#2C180D]">
                Delivery Coverage &amp; Policy
              </h3>
              <p className="text-xs text-stone-500">
                Carefully hand-delivered by our local store team.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-stone-600 leading-relaxed">
            <div className="space-y-2">
              <h4 className="font-bold text-sm text-[#2C180D]">Delivery Areas:</h4>
              <p>
                We provide prompt delivery to all major neighborhoods in the Mira-Bhayandar region including:
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                {[
                  'Bhayandar East',
                  'Navghar Road',
                  'Golden Nest',
                  'Jesal Park',
                  'Indralok Phase 1-3',
                  'Station Road',
                  'Bhayandar West',
                  'Mira Road Station & Shanti Nagar',
                ].map((loc) => (
                  <span
                    key={loc}
                    className="px-2.5 py-1 rounded-md bg-[#FAF5EE] border border-[#E7D5C7] text-stone-700 font-medium text-[11px]"
                  >
                    {loc}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-bold text-sm text-[#2C180D]">Delivery Charges &amp; Fulfilment:</h4>
              <div className="p-3.5 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 text-xs leading-relaxed">
                <ShieldCheck className="w-4 h-4 text-amber-700 inline mr-1.5 -mt-0.5" />
                <strong>Important:</strong> Delivery charges may vary based on location. Our team will confirm the final delivery charge before confirming your order.
              </div>
              <p>
                Store pickup is always 100% free! You can conveniently pick up your prepared cake at our counter at your chosen time slot.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
