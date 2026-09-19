import React from 'react';
import { MapPin, Phone, MessageCircle, Navigation, Clock, ShieldCheck } from 'lucide-react';
import { generateGeneralWhatsAppUrl, getShopPhoneNumber } from '@/lib/whatsapp';

export default function LocationSection() {
  const phone = getShopPhoneNumber();
  const whatsappUrl = generateGeneralWhatsAppUrl();
  const googleMapsUrl = 'https://maps.google.com/?q=Magic+Cake+Shop+Bhanu+Park+CHS+Navghar+Road+Bhayandar+East+401105';

  return (
    <section className="py-16 bg-[#FAF5EE]/40" id="location">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-[#E7D5C7] p-6 sm:p-10 shadow-sm overflow-hidden relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Store Info */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-800 block mb-1">
                  Visit Our Local Counter
                </span>
                <h2 className="font-serif text-2xl sm:text-4xl font-extrabold text-[#2C180D] tracking-tight">
                  Magic Cake Shop, Bhayandar East
                </h2>
              </div>

              {/* Address detail card */}
              <div className="p-5 rounded-2xl bg-[#FAF5EE] border border-[#E7D5C7]/80 space-y-3">
                <div className="flex items-start space-x-3.5">
                  <div className="w-9 h-9 rounded-xl bg-[#3E2313] text-amber-200 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5 text-amber-300" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-[#2C180D]">Bakery Address</h4>
                    <p className="text-sm text-stone-600 mt-0.5 leading-relaxed">
                      Bhanu Park CHS, Navghar Road,<br />
                      Bhayandar East, Maharashtra 401105
                    </p>
                    <span className="inline-block mt-1 text-xs text-amber-800 font-medium">
                      Landmark: Near Navghar Police Station road
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-3.5 pt-2 border-t border-[#E7D5C7]/60 text-xs text-stone-600">
                  <Clock className="w-4 h-4 text-amber-700 shrink-0" />
                  <span>
                    <strong>Hours:</strong> Open every day from <strong>9:00 AM to 11:30 PM</strong>
                  </span>
                </div>
              </div>

              {/* Delivery coverage note */}
              <div className="text-xs text-stone-500 leading-relaxed flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  Delivering fresh across Bhayandar East, Bhayandar West, and Mira Road. Store pickup available anytime during shop hours.
                </span>
              </div>

              {/* Action Buttons: Google Maps, Call, WhatsApp */}
              <div className="flex flex-wrap gap-3 pt-2">
                {/* Google Maps Button */}
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#3E2313] hover:bg-[#2C180D] text-amber-100 hover:text-white text-xs sm:text-sm font-bold shadow-xs transition-all"
                  id="location-btn-maps"
                >
                  <Navigation className="w-4 h-4 text-amber-300" />
                  <span>Get Directions on Google Maps</span>
                </a>

                {/* Call Button */}
                <a
                  href={`tel:${phone}`}
                  className="inline-flex items-center gap-2 px-4 py-3 rounded-xl border border-[#E7D5C7] bg-[#FAF5EE] text-[#3E2313] hover:bg-[#F3EAE0] text-xs sm:text-sm font-bold transition-all"
                  id="location-btn-call"
                >
                  <Phone className="w-4 h-4 text-amber-700" />
                  <span>Call: {phone}</span>
                </a>

                {/* WhatsApp Button */}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 hover:bg-emerald-100 text-xs sm:text-sm font-bold transition-all"
                  id="location-btn-whatsapp"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  <span>WhatsApp Us</span>
                </a>
              </div>
            </div>

            {/* Right: Map Graphic / Storefront Card */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden border border-[#E7D5C7] bg-[#FAF5EE] p-6 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center mx-auto shadow-inner">
                  <MapPin className="w-8 h-8 text-amber-600 animate-bounce" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#2C180D]">
                    Local Bakery in Bhayandar
                  </h3>
                  <p className="text-xs text-stone-500 max-w-xs mx-auto mt-1 leading-relaxed">
                    Centrally situated on Navghar Road in Bhayandar East. Click below to view live directions or contact us before dropping in!
                  </p>
                </div>
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block w-full py-2.5 px-4 rounded-xl bg-[#FAF5EE] hover:bg-[#F3EAE0] border border-[#E7D5C7] text-xs font-bold text-[#2C180D] transition-colors"
                >
                  Open in Google Maps App →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
