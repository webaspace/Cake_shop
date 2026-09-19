'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Product } from '@/types/product';
import { OrderInput, FulfilmentType } from '@/types/order';
import { createOrder } from '@/lib/data-service';
import { generateOrderWhatsAppUrl } from '@/lib/whatsapp';
import { Calendar, Clock, MapPin, Truck, Store, AlertCircle, Sparkles, MessageSquare, Phone } from 'lucide-react';

interface OrderFormProps {
  initialProduct?: Product | null;
  initialSize?: string;
  onSuccess?: (orderId: string, orderNumber: string) => void;
}

export default function OrderForm({ initialProduct, initialSize, onSuccess }: OrderFormProps) {
  const router = useRouter();

  // Selected size & pricing
  const [selectedSize, setSelectedSize] = useState<string>(
    initialSize || initialProduct?.sizes?.[0]?.size || '500g'
  );
  const [quantity, setQuantity] = useState<number>(1);

  // Customer info
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [sameAsPhone, setSameAsPhone] = useState(true);
  const [email, setEmail] = useState('');

  // Cake details
  const [cakeMessage, setCakeMessage] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');

  // Fulfilment
  const [fulfilmentType, setFulfilmentType] = useState<FulfilmentType>('delivery');
  const [address, setAddress] = useState('');
  const [area, setArea] = useState('Bhayandar East');
  const [pincode, setPincode] = useState('401105');
  
  // Date calculation for default preferred date (e.g. today or tomorrow)
  const todayIso = new Date().toISOString().split('T')[0];
  const [preferredDate, setPreferredDate] = useState(todayIso);
  const [preferredTime, setPreferredTime] = useState('Evening (5:00 PM - 8:00 PM)');

  // Status
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Price calculations
  const currentSizeObj = initialProduct?.sizes?.find((s) => s.size === selectedSize) || {
    size: selectedSize,
    price: initialProduct?.price || 500,
    label: selectedSize,
  };
  const unitPrice = currentSizeObj.price;
  const estimatedTotal = unitPrice * quantity;

  // Sync WhatsApp number if checkbox is active
  const handlePhoneChange = (val: string) => {
    setPhone(val);
    if (sameAsPhone) {
      setWhatsapp(val);
    }
  };

  const handleSameAsPhoneToggle = (checked: boolean) => {
    setSameAsPhone(checked);
    if (checked) {
      setWhatsapp(phone);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    // Validation
    if (!customerName.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (!phone.trim() || phone.trim().length < 10) {
      setErrorMsg('Please enter a valid 10-digit phone number.');
      return;
    }
    const finalWhatsApp = sameAsPhone ? phone : whatsapp;
    if (!finalWhatsApp.trim() || finalWhatsApp.trim().length < 10) {
      setErrorMsg('Please enter a valid WhatsApp contact number.');
      return;
    }
    if (!preferredDate) {
      setErrorMsg('Please choose your preferred date.');
      return;
    }
    if (fulfilmentType === 'delivery' && !address.trim()) {
      setErrorMsg('Please enter your delivery street address.');
      return;
    }

    try {
      setLoading(true);
      const orderPayload: OrderInput = {
        customer_name: customerName.trim(),
        phone: phone.trim(),
        whatsapp: finalWhatsApp.trim(),
        email: email.trim() || undefined,
        product_id: initialProduct?.id,
        product_name: initialProduct?.name || 'Custom Bakery Cake',
        quantity,
        size: selectedSize,
        unit_price: unitPrice,
        total_estimated_price: estimatedTotal,
        cake_message: cakeMessage.trim() || undefined,
        special_instructions: specialInstructions.trim() || undefined,
        fulfilment_type: fulfilmentType,
        delivery_address: fulfilmentType === 'delivery' ? address.trim() : undefined,
        delivery_area: fulfilmentType === 'delivery' ? area.trim() : undefined,
        pincode: fulfilmentType === 'delivery' ? pincode.trim() : undefined,
        preferred_date: preferredDate,
        preferred_time: preferredTime,
      };

      const created = await createOrder(orderPayload);

      if (onSuccess) {
        onSuccess(created.id, created.order_number);
      } else {
        router.push(`/order-confirmation?order_id=${created.id}&order_number=${created.order_number}`);
      }
    } catch (err: any) {
      console.error('Order submission error:', err);
      setErrorMsg('Could not place your order. Please try again or chat directly with us on WhatsApp.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {errorMsg && (
        <div className="p-3.5 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* 1. Cake & Size Summary */}
      <div className="bg-[#FAF5EE] rounded-xl p-4 border border-[#E7D5C7]/70 space-y-3">
        <div className="flex items-start justify-between">
          <div>
            <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider block">
              Cake Selected
            </span>
            <h4 className="font-serif text-lg font-bold text-[#2C180D]">
              {initialProduct?.name || 'Special Celebration Cake'}
            </h4>
            {initialProduct?.eggless && (
              <span className="inline-flex items-center gap-1 text-[11px] text-emerald-800 font-semibold mt-0.5">
                <span className="veg-badge scale-75">
                  <span className="veg-badge-dot"></span>
                </span>
                100% Eggless
              </span>
            )}
          </div>
          <div className="text-right">
            <span className="text-xs text-stone-500 block">Unit Price</span>
            <span className="text-lg font-bold text-[#3E2313]">₹{unitPrice}</span>
          </div>
        </div>

        {/* Size selection */}
        {initialProduct?.sizes && initialProduct.sizes.length > 0 && (
          <div>
            <label className="text-xs font-semibold text-stone-600 block mb-1.5">
              Choose Weight / Size:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {initialProduct.sizes.map((s) => (
                <button
                  type="button"
                  key={s.size}
                  onClick={() => setSelectedSize(s.size)}
                  className={`py-2 px-2.5 rounded-lg text-xs font-semibold border text-center transition-all ${
                    selectedSize === s.size
                      ? 'bg-[#3E2313] text-white border-[#3E2313] shadow-xs'
                      : 'bg-white text-stone-700 border-[#E7D5C7] hover:bg-[#FAF5EE]'
                  }`}
                >
                  <div>{s.size}</div>
                  <div className="text-[10px] opacity-80 mt-0.5">₹{s.price}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Quantity Stepper */}
        <div className="flex items-center justify-between pt-1">
          <label className="text-xs font-semibold text-stone-600">Quantity:</label>
          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-8 h-8 rounded-lg bg-white border border-[#E7D5C7] text-[#3E2313] font-bold text-sm flex items-center justify-center hover:bg-[#FAF5EE]"
            >
              -
            </button>
            <span className="w-8 text-center text-sm font-bold text-[#2C180D]">{quantity}</span>
            <button
              type="button"
              onClick={() => setQuantity(quantity + 1)}
              className="w-8 h-8 rounded-lg bg-white border border-[#E7D5C7] text-[#3E2313] font-bold text-sm flex items-center justify-center hover:bg-[#FAF5EE]"
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* 2. Custom Message & Notes */}
      <div className="space-y-3">
        <div>
          <label className="text-xs font-semibold text-stone-700 block mb-1">
            Message on Cake (e.g. &quot;Happy Birthday Aarav&quot;):
          </label>
          <input
            type="text"
            value={cakeMessage}
            onChange={(e) => setCakeMessage(e.target.value)}
            placeholder="Write message to be iced on the cake..."
            maxLength={60}
            className="w-full px-3.5 py-2.5 rounded-xl border border-[#E7D5C7] bg-white text-sm text-[#2C180D] placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#684128]/30"
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-stone-700 block mb-1">
            Special Instructions / Dietary Notes (Optional):
          </label>
          <textarea
            value={specialInstructions}
            onChange={(e) => setSpecialInstructions(e.target.value)}
            placeholder="e.g. Less cream, extra chocolate curls, candles & knife needed..."
            rows={2}
            className="w-full px-3.5 py-2.5 rounded-xl border border-[#E7D5C7] bg-white text-sm text-[#2C180D] placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#684128]/30"
          />
        </div>
      </div>

      {/* 3. Customer Information */}
      <div className="space-y-3 pt-2 border-t border-[#FAF5EE]">
        <h5 className="font-serif text-sm font-bold text-[#2C180D] uppercase tracking-wider">
          Customer Details
        </h5>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-medium text-stone-600 block mb-1">
              Full Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="e.g. Rahul Sharma"
              className="w-full px-3.5 py-2 rounded-xl border border-[#E7D5C7] text-sm focus:outline-none focus:ring-2 focus:ring-[#684128]/30"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-stone-600 block mb-1">
              Phone Number <span className="text-rose-500">*</span>
            </label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => handlePhoneChange(e.target.value)}
              placeholder="10-digit mobile number"
              className="w-full px-3.5 py-2 rounded-xl border border-[#E7D5C7] text-sm focus:outline-none focus:ring-2 focus:ring-[#684128]/30"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-xs font-medium text-stone-600">
              WhatsApp Number <span className="text-rose-500">*</span>
            </label>
            <label className="flex items-center gap-1 text-[11px] text-[#684128] font-medium cursor-pointer">
              <input
                type="checkbox"
                checked={sameAsPhone}
                onChange={(e) => handleSameAsPhoneToggle(e.target.checked)}
                className="rounded border-stone-300 text-[#3E2313] focus:ring-[#3E2313]"
              />
              Same as Phone Number
            </label>
          </div>
          {!sameAsPhone && (
            <input
              type="tel"
              required
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              placeholder="WhatsApp number for order updates"
              className="w-full px-3.5 py-2 rounded-xl border border-[#E7D5C7] text-sm focus:outline-none focus:ring-2 focus:ring-[#684128]/30 mt-1"
            />
          )}
        </div>

        <div>
          <label className="text-xs font-medium text-stone-600 block mb-1">
            Email Address (Optional)
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="For receipt copy (optional)"
            className="w-full px-3.5 py-2 rounded-xl border border-[#E7D5C7] text-sm focus:outline-none focus:ring-2 focus:ring-[#684128]/30"
          />
        </div>
      </div>

      {/* 4. Fulfilment: Delivery or Pickup */}
      <div className="space-y-3 pt-2 border-t border-[#FAF5EE]">
        <h5 className="font-serif text-sm font-bold text-[#2C180D] uppercase tracking-wider">
          Fulfilment Method
        </h5>

        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setFulfilmentType('delivery')}
            className={`p-3 rounded-xl border flex items-center gap-2.5 text-left transition-all ${
              fulfilmentType === 'delivery'
                ? 'bg-amber-50/70 border-amber-600 text-[#2C180D] shadow-xs'
                : 'bg-white border-[#E7D5C7] text-stone-600 hover:bg-[#FAF5EE]'
            }`}
          >
            <div className={`p-2 rounded-lg ${fulfilmentType === 'delivery' ? 'bg-amber-600 text-white' : 'bg-stone-100 text-stone-500'}`}>
              <Truck className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold">Home Delivery</div>
              <div className="text-[10px] text-stone-500">Bhayandar &amp; Mira Rd</div>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setFulfilmentType('pickup')}
            className={`p-3 rounded-xl border flex items-center gap-2.5 text-left transition-all ${
              fulfilmentType === 'pickup'
                ? 'bg-amber-50/70 border-amber-600 text-[#2C180D] shadow-xs'
                : 'bg-white border-[#E7D5C7] text-stone-600 hover:bg-[#FAF5EE]'
            }`}
          >
            <div className={`p-2 rounded-lg ${fulfilmentType === 'pickup' ? 'bg-amber-600 text-white' : 'bg-stone-100 text-stone-500'}`}>
              <Store className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold">Store Pickup</div>
              <div className="text-[10px] text-stone-500">Navghar Rd, Bhayandar E</div>
            </div>
          </button>
        </div>

        {/* If Delivery: address fields */}
        {fulfilmentType === 'delivery' ? (
          <div className="space-y-2.5 bg-[#FAF5EE]/60 p-3.5 rounded-xl border border-[#E7D5C7]">
            <div>
              <label className="text-xs font-medium text-stone-600 block mb-1">
                Street Address / Flat No / Building <span className="text-rose-500">*</span>
              </label>
              <textarea
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                rows={2}
                placeholder="e.g. Flat 402, Bhanu Park CHS, Navghar Road"
                className="w-full px-3 py-2 rounded-lg border border-[#E7D5C7] bg-white text-xs focus:outline-none focus:ring-2 focus:ring-[#684128]/30"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[11px] font-medium text-stone-600 block mb-1">
                  Area / Locality
                </label>
                <select
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg border border-[#E7D5C7] bg-white text-xs text-[#2C180D]"
                >
                  <option value="Bhayandar East">Bhayandar East</option>
                  <option value="Navghar Road">Navghar Road</option>
                  <option value="Golden Nest">Golden Nest</option>
                  <option value="Jesal Park">Jesal Park</option>
                  <option value="Indralok">Indralok</option>
                  <option value="Station Road">Station Road</option>
                  <option value="Bhayandar West">Bhayandar West</option>
                  <option value="Mira Road">Mira Road</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-medium text-stone-600 block mb-1">
                  Pincode
                </label>
                <input
                  type="text"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg border border-[#E7D5C7] bg-white text-xs text-[#2C180D]"
                />
              </div>
            </div>

            {/* Delivery Charge Notice (Mandatory Requirement) */}
            <div className="p-2.5 bg-amber-100/50 rounded-lg border border-amber-200/60 text-[11px] text-amber-900 leading-relaxed">
              <span className="font-semibold">Notice:</span> Delivery charges may vary based on location. Our team will confirm the final delivery charge before confirming your order.
            </div>
          </div>
        ) : (
          <div className="p-3 bg-[#FAF5EE]/60 rounded-xl border border-[#E7D5C7] text-xs text-stone-600 leading-relaxed">
            <span className="font-bold text-[#2C180D] block mb-0.5">Pickup Location:</span>
            Magic Cake Shop, Bhanu Park CHS, Navghar Road, Bhayandar East, Maharashtra 401105.
          </div>
        )}

        {/* Date & Time */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-medium text-stone-600 block mb-1">
              Preferred {fulfilmentType === 'delivery' ? 'Delivery' : 'Pickup'} Date <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <input
                type="date"
                required
                min={todayIso}
                value={preferredDate}
                onChange={(e) => setPreferredDate(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-[#E7D5C7] bg-white text-xs text-[#2C180D] focus:outline-none focus:ring-2 focus:ring-[#684128]/30"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-stone-600 block mb-1">
              Preferred Time Slot <span className="text-rose-500">*</span>
            </label>
            <select
              value={preferredTime}
              onChange={(e) => setPreferredTime(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-[#E7D5C7] bg-white text-xs text-[#2C180D] focus:outline-none focus:ring-2 focus:ring-[#684128]/30"
            >
              <option value="Morning (10:00 AM - 1:00 PM)">Morning (10:00 AM - 1:00 PM)</option>
              <option value="Afternoon (1:00 PM - 5:00 PM)">Afternoon (1:00 PM - 5:00 PM)</option>
              <option value="Evening (5:00 PM - 8:00 PM)">Evening (5:00 PM - 8:00 PM)</option>
              <option value="Late Evening (8:00 PM - 10:30 PM)">Late Evening (8:00 PM - 10:30 PM)</option>
            </select>
          </div>
        </div>
      </div>

      {/* 5. Total & Submit */}
      <div className="pt-4 border-t border-[#FAF5EE] space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-stone-600 font-medium">Estimated Order Total:</span>
          <span className="text-xl font-bold text-[#2C180D]">₹{estimatedTotal}</span>
        </div>
        <p className="text-[11px] text-stone-500">
          * Final pricing, delivery fee &amp; payment will be verified directly with you on WhatsApp/Phone.
        </p>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#3E2313] to-[#684128] hover:from-[#2C180D] hover:to-[#4A2E1B] text-amber-100 hover:text-white font-bold text-sm shadow-md hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {loading ? (
            <span>Processing your order...</span>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Submit Cake Request</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
