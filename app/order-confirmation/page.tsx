import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import OrderConfirmationView from '@/components/order/OrderConfirmationView';

export const metadata: Metadata = {
  title: 'Order Received | Magic Cake Shop Bhayandar East',
  description: 'Thank you for your order request at Magic Cake Shop Bhayandar. Confirming via WhatsApp.',
};

export default function OrderConfirmationPage() {
  return (
    <Suspense
      fallback={
        <div className="py-24 text-center">
          <div className="animate-spin w-8 h-8 border-4 border-[#3E2313] border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-sm text-stone-500 font-medium">Loading order details...</p>
        </div>
      }
    >
      <OrderConfirmationView />
    </Suspense>
  );
}
