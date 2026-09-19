import React from 'react';
import Link from 'next/link';
import { Cake, Phone, MessageCircle, MapPin, Clock, Heart, ShieldCheck, ExternalLink } from 'lucide-react';
import { generateGeneralWhatsAppUrl, getShopPhoneNumber } from '@/lib/whatsapp';

export default function Footer() {
  const phone = getShopPhoneNumber();
  const whatsappUrl = generateGeneralWhatsAppUrl();

  return (
    <footer className="bg-[#2C180D] text-[#FAF5EE] pt-16 pb-24 md:pb-12 border-t border-[#3E2313] mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-[#4A2E1B]">
          {/* Brand & Story */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-amber-600/30 flex items-center justify-center text-amber-300">
                <Cake className="w-6 h-6" />
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-white">
                Magic Cake Shop
              </span>
            </div>
            <p className="text-sm text-stone-300 leading-relaxed">
              Bhayandar East’s neighborhood bakery crafted for your sweetest moments. Hand-baked fresh daily with 100% pure vegetarian options, Belgian chocolate truffle, rich fusion flavors, and bespoke celebration cakes.
            </p>
            <div className="flex items-center space-x-3 pt-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/40 text-emerald-400 flex items-center justify-center transition-colors"
                title="Chat on WhatsApp"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
              <a
                href={`tel:${phone}`}
                className="w-10 h-10 rounded-lg bg-amber-600/20 hover:bg-amber-600/40 text-amber-300 flex items-center justify-center transition-colors"
                title="Call Shop"
              >
                <Phone className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-lg font-semibold text-amber-200 mb-4">
              Explore Bakery
            </h4>
            <ul className="space-y-2.5 text-sm text-stone-300">
              <li>
                <Link href="/cakes" className="hover:text-amber-200 transition-colors">
                  All Cakes & Desserts
                </Link>
              </li>
              <li>
                <Link href="/cakes?category=birthday-cakes" className="hover:text-amber-200 transition-colors">
                  Birthday Special Cakes
                </Link>
              </li>
              <li>
                <Link href="/cakes?category=chocolate-cakes" className="hover:text-amber-200 transition-colors">
                  Dutch Chocolate & Truffle
                </Link>
              </li>
              <li>
                <Link href="/cakes?category=eggless-cakes" className="hover:text-amber-200 transition-colors">
                  100% Eggless Cakes
                </Link>
              </li>
              <li>
                <Link href="/custom-cakes" className="hover:text-amber-200 transition-colors">
                  Custom & Fondant Designs
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-amber-200 transition-colors">
                  Our Story & Hygiene Standards
                </Link>
              </li>
            </ul>
          </div>

          {/* Delivery & Areas */}
          <div>
            <h4 className="font-serif text-lg font-semibold text-amber-200 mb-4">
              Delivery & Fulfilment
            </h4>
            <p className="text-sm text-stone-300 leading-relaxed mb-3">
              We proudly deliver across:
            </p>
            <div className="flex flex-wrap gap-1.5 mb-4">
              {['Bhayandar East', 'Navghar Road', 'Golden Nest', 'Jesal Park', 'Indralok', 'Bhayandar West', 'Mira Road'].map((area) => (
                <span
                  key={area}
                  className="text-xs bg-[#3E2313] text-stone-200 px-2.5 py-1 rounded-md border border-[#4A2E1B]"
                >
                  {area}
                </span>
              ))}
            </div>
            <div className="p-3 bg-[#1D0F08]/80 rounded-xl border border-[#4A2E1B] text-xs text-amber-200/90 leading-relaxed">
              <ShieldCheck className="w-4 h-4 text-amber-400 inline mr-1.5 -mt-0.5" />
              Delivery charges may vary based on location. Our team will confirm the final delivery charge before confirming your order.
            </div>
          </div>

          {/* Visit & Contact */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-semibold text-amber-200 mb-4">
              Visit Our Shop
            </h4>
            <div className="flex items-start space-x-3 text-sm text-stone-300">
              <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <span>
                <strong>Magic Cake Shop</strong><br />
                Bhanu Park CHS, Navghar Road,<br />
                Bhayandar East, Maharashtra 401105
              </span>
            </div>
            <div className="flex items-center space-x-3 text-sm text-stone-300">
              <Clock className="w-5 h-5 text-amber-400 shrink-0" />
              <span>Open Daily: 9:00 AM – 11:30 PM</span>
            </div>
            <div className="pt-1">
              <a
                href="https://maps.google.com/?q=Bhanu+Park+CHS+Navghar+Road+Bhayandar+East+401105"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-amber-300 hover:text-amber-200 underline font-medium"
              >
                Open in Google Maps <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-400 gap-4">
          <p>© {new Date().getFullYear()} Magic Cake Shop, Bhayandar East. All rights reserved.</p>
          <div className="flex items-center space-x-6">
            <Link href="/contact" className="hover:text-amber-200 transition-colors">
              Contact & Directions
            </Link>
            <Link href="/about" className="hover:text-amber-200 transition-colors">
              About Us
            </Link>
            <Link href="/admin" className="hover:text-amber-200 transition-colors opacity-70">
              Shop Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
