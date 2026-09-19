'use client';

import React from 'react';
import Link from 'next/link';
import { Phone, MessageCircle, Cake } from 'lucide-react';
import { generateGeneralWhatsAppUrl, getShopPhoneNumber } from '@/lib/whatsapp';

export default function MobileBottomBar() {
  const phone = getShopPhoneNumber();
  const whatsappUrl = generateGeneralWhatsAppUrl();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#FDFBF7]/95 backdrop-blur-md border-t border-[#E7D5C7] shadow-[0_-4px_16px_rgba(0,0,0,0.08)] py-2 px-3 safe-area-pb">
      <div className="grid grid-cols-3 gap-2 items-center max-w-md mx-auto">
        {/* Call Button */}
        <a
          href={`tel:${phone}`}
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-[#FAF5EE] text-[#2C180D] border border-[#E7D5C7] text-xs font-semibold hover:bg-[#F3EAE0] transition-colors active:scale-95"
          id="mobile-action-call"
        >
          <Phone className="w-4 h-4 mb-1 text-amber-700" />
          <span>Call</span>
        </a>

        {/* WhatsApp Button */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-300 text-xs font-semibold hover:bg-emerald-100 transition-colors active:scale-95"
          id="mobile-action-whatsapp"
        >
          <MessageCircle className="w-4 h-4 mb-1 text-emerald-600 fill-emerald-600/20" />
          <span>WhatsApp</span>
        </a>

        {/* Order Button */}
        <Link
          href="/cakes"
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-gradient-to-r from-[#3E2313] to-[#684128] text-amber-100 text-xs font-semibold shadow-md active:scale-95"
          id="mobile-action-order"
        >
          <Cake className="w-4 h-4 mb-1 text-amber-300" />
          <span>Order</span>
        </Link>
      </div>
    </div>
  );
}
