'use client';

import React from 'react';
import { X, Cake } from 'lucide-react';
import { Product } from '@/types/product';
import OrderForm from '@/components/order/OrderForm';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  selectedSize?: string;
}

export default function OrderModal({ isOpen, onClose, product, selectedSize }: OrderModalProps) {
  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative bg-[#FDFBF7] rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#E7D5C7] p-6">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#FAF5EE]">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center text-amber-800">
              <Cake className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-[#2C180D]">
                Order Cake Enquiry
              </h3>
              <p className="text-[11px] text-stone-500">
                Direct bakery confirmation via WhatsApp/Phone
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <OrderForm
          initialProduct={product}
          initialSize={selectedSize}
        />
      </div>
    </div>
  );
}
