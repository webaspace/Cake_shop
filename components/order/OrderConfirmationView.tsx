'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CheckCircle2, MessageCircle, ArrowLeft, Clock, MapPin, Cake, Phone, ShieldCheck } from 'lucide-react';
import { Order } from '@/types/order';
import { getOrderByIdOrNumber } from '@/lib/data-service';
import { generateOrderWhatsAppUrl, getShopPhoneNumber } from '@/lib/whatsapp';

export default function OrderConfirmationView() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('order_id');
  const orderNumber = searchParams.get('order_number') || 'MCS-XXXX';

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const phone = getShopPhoneNumber();

  useEffect(() => {
    async function load() {
      if (orderId) {
        const found = await getOrderByIdOrNumber(orderId);
        if (found) {
          setOrder(found);
        }
      }
      setLoading(false);
    }
    load();
  }, [orderId]);

  // Generate WhatsApp message for this order
  const whatsappUrl = order
    ? generateOrderWhatsAppUrl(order, order.order_number)
    : generateOrderWhatsAppUrl(
        {
          customer_name: 'Valued Customer',
          product_name: 'Celebration Cake',
          quantity: 1,
          size: '1 kg',
          fulfilment_type: 'delivery',
          preferred_date: 'As requested',
          preferred_time: 'Standard slot',
          phone: phone,
          whatsapp: phone,
          unit_price: 550,
          total_estimated_price: 550,
        },
        orderNumber
      );

  return (
    <div className="py-12 sm:py-16 bg-[#FDFBF7] min-h-[80vh] flex items-center justify-center">
      <div className="max-w-xl w-full mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-3xl border border-[#E7D5C7] p-6 sm:p-10 shadow-xl text-center space-y-6">
          {/* Animated Success Checkmark */}
          <div className="w-20 h-20 rounded-full bg-emerald-50 border-4 border-emerald-100 flex items-center justify-center mx-auto text-emerald-600 shadow-sm animate-in zoom-in-50 duration-300">
            <CheckCircle2 className="w-10 h-10 text-emerald-600" />
          </div>

          {/* Heading strictly matching spec */}
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 inline-block">
              Order Reference: #{order?.order_number || orderNumber}
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#2C180D] tracking-tight">
              Thank you! Your cake request has been received.
            </h1>
            <p className="text-sm text-stone-600 leading-relaxed max-w-md mx-auto">
              Our team will contact you on WhatsApp/phone to confirm availability, final price, payment and delivery charges.
            </p>
          </div>

          {/* Order Summary Details */}
          {order && (
            <div className="text-left bg-[#FAF5EE] rounded-2xl p-5 border border-[#E7D5C7]/80 text-xs space-y-2.5">
              <div className="font-bold text-sm text-[#2C180D] pb-2 border-b border-[#E7D5C7] flex items-center justify-between">
                <span>Order Summary</span>
                <span className="text-amber-800 font-serif">₹{order.total_estimated_price}</span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-stone-600">
                <div>
                  <span className="font-semibold text-stone-700 block">Cake:</span>
                  <span>{order.product_name}</span>
                </div>
                <div>
                  <span className="font-semibold text-stone-700 block">Size &amp; Qty:</span>
                  <span>{order.size} (Qty: {order.quantity})</span>
                </div>
                <div>
                  <span className="font-semibold text-stone-700 block">Fulfilment:</span>
                  <span className="capitalize">{order.fulfilment_type === 'delivery' ? 'Home Delivery' : 'Store Pickup'}</span>
                </div>
                <div>
                  <span className="font-semibold text-stone-700 block">Preferred Slot:</span>
                  <span>{order.preferred_date} • {order.preferred_time}</span>
                </div>
              </div>

              {order.cake_message && (
                <div className="pt-2 border-t border-[#E7D5C7]/50">
                  <span className="font-semibold text-stone-700 block">Message on Cake:</span>
                  <span className="italic text-stone-800">&ldquo;{order.cake_message}&rdquo;</span>
                </div>
              )}

              {order.delivery_address && (
                <div className="pt-1">
                  <span className="font-semibold text-stone-700 block">Delivery To:</span>
                  <span className="text-stone-700">{order.delivery_address}, {order.delivery_area} ({order.pincode})</span>
                </div>
              )}
            </div>
          )}

          {/* Prompt Notice */}
          <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 leading-relaxed flex items-start gap-2 text-left">
            <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <span>
              <strong>Next Step:</strong> Click the button below to message our bakery directly on WhatsApp with your order details for instant confirmation!
            </span>
          </div>

          {/* Action Buttons strictly matching spec: "Continue on WhatsApp" & "Back to Cakes" */}
          <div className="space-y-3 pt-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all"
              id="btn-confirm-whatsapp"
            >
              <MessageCircle className="w-5 h-5 fill-white/20" />
              <span>Continue on WhatsApp</span>
            </a>

            <Link
              href="/cakes"
              className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl border border-[#E7D5C7] bg-[#FAF5EE] text-[#3E2313] hover:bg-[#F3EAE0] font-bold text-xs sm:text-sm transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Cakes</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
