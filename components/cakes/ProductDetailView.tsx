'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types/product';
import OrderModal from '@/components/cakes/OrderModal';
import {
  MessageCircle,
  ShoppingBag,
  Sparkles,
  ShieldCheck,
  Truck,
  Store,
  ChevronRight,
  Clock,
  Heart,
  AlertCircle,
} from 'lucide-react';
import { generateOrderWhatsAppUrl, generateProductInquiryUrl } from '@/lib/whatsapp';

interface ProductDetailViewProps {
  product: Product;
  relatedProducts: Product[];
}

export default function ProductDetailView({ product, relatedProducts }: ProductDetailViewProps) {
  const [selectedSize, setSelectedSize] = useState<string>(
    product.sizes?.[0]?.size || '500g'
  );
  const [activeImage, setActiveImage] = useState<string>(product.image_url);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const activeSizeObj = product.sizes?.find((s) => s.size === selectedSize) || {
    size: selectedSize,
    price: product.price,
    label: selectedSize,
  };

  const currentPrice = activeSizeObj.price;
  const whatsappUrl = generateProductInquiryUrl(product.name, selectedSize);

  return (
    <div className="py-8 sm:py-12 bg-[#FDFBF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center space-x-2 text-xs text-stone-500 mb-6">
          <Link href="/" className="hover:text-[#2C180D] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
          <Link href="/cakes" className="hover:text-[#2C180D] transition-colors">
            Cakes
          </Link>
          {product.category && (
            <>
              <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
              <Link
                href={`/cakes?category=${product.category.slug}`}
                className="hover:text-[#2C180D] transition-colors"
              >
                {product.category.name}
              </Link>
            </>
          )}
          <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
          <span className="font-semibold text-[#2C180D] truncate max-w-[200px]">
            {product.name}
          </span>
        </nav>

        {/* Main Product Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 bg-white rounded-3xl p-6 sm:p-10 border border-[#E7D5C7]/80 shadow-sm">
          {/* Left Column: Image Gallery */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-[#FAF5EE] border border-[#E7D5C7] shadow-inner">
              <Image
                src={activeImage}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />

              {/* Eggless badge overlay */}
              <div className="absolute top-4 left-4 z-10">
                {product.eggless ? (
                  <div className="inline-flex items-center gap-1.5 bg-white/95 backdrop-blur-xs px-3 py-1.5 rounded-full text-xs font-bold text-emerald-800 shadow-md border border-emerald-100">
                    <span className="veg-badge">
                      <span className="veg-badge-dot"></span>
                    </span>
                    <span>100% Pure Vegetarian / Eggless</span>
                  </div>
                ) : (
                  <div className="inline-flex items-center gap-1.5 bg-white/95 backdrop-blur-xs px-3 py-1.5 rounded-full text-xs font-bold text-rose-800 shadow-md border border-rose-100">
                    <span className="non-veg-badge">
                      <span className="non-veg-badge-dot"></span>
                    </span>
                    <span>Contains Egg</span>
                  </div>
                )}
              </div>
            </div>

            {/* Thumbnails if gallery exists */}
            {product.gallery && product.gallery.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-1">
                {product.gallery.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                      activeImage === img
                        ? 'border-[#3E2313] scale-95 shadow-xs'
                        : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <Image src={img} alt="" fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Details, Size Selector, Pricing & CTAs */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              {/* Category & Tags */}
              <div className="flex flex-wrap items-center gap-2">
                {product.category && (
                  <span className="text-xs font-bold text-amber-800 bg-[#FAF5EE] px-3 py-1 rounded-full border border-[#E7D5C7]">
                    {product.category.name}
                  </span>
                )}
                {product.flavor && (
                  <span className="text-xs font-medium text-stone-600 bg-stone-100 px-3 py-1 rounded-full">
                    Flavor: {product.flavor}
                  </span>
                )}
                {product.featured && (
                  <span className="text-xs font-bold text-white bg-gradient-to-r from-amber-600 to-amber-500 px-3 py-1 rounded-full shadow-xs">
                    ★ Bestseller
                  </span>
                )}
              </div>

              {/* Product Title */}
              <h1 className="font-serif text-2xl sm:text-4xl font-extrabold text-[#2C180D] tracking-tight">
                {product.name}
              </h1>

              {/* Price */}
              <div className="flex items-baseline gap-3 pb-2 border-b border-[#FAF5EE]">
                <span className="text-3xl sm:text-4xl font-extrabold text-[#3E2313]">
                  ₹{currentPrice}
                </span>
                <span className="text-xs text-stone-500">
                  (Estimated price for {selectedSize})
                </span>
              </div>

              {/* Description */}
              <p className="text-sm text-stone-600 leading-relaxed">
                {product.description}
              </p>

              {/* Size Selector */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="space-y-2 pt-2">
                  <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block">
                    Choose Weight / Serving Size:
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {product.sizes.map((s) => (
                      <button
                        key={s.size}
                        type="button"
                        onClick={() => setSelectedSize(s.size)}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          selectedSize === s.size
                            ? 'bg-[#3E2313] text-white border-[#3E2313] shadow-md'
                            : 'bg-[#FAF5EE]/60 text-[#2C180D] border-[#E7D5C7] hover:bg-[#FAF5EE]'
                        }`}
                      >
                        <div className="text-sm font-bold">{s.size}</div>
                        <div className="text-xs font-medium opacity-90 mt-0.5">₹{s.price}</div>
                        <div className="text-[10px] opacity-75 mt-1 leading-tight">{s.label}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Customization Details */}
              <div className="bg-[#FAF5EE]/80 rounded-2xl p-4 border border-[#E7D5C7] space-y-2 text-xs text-stone-600">
                <div className="flex items-center gap-2 font-bold text-[#2C180D]">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span>Free Customizations Available:</span>
                </div>
                <ul className="list-disc list-inside space-y-1 text-stone-600 pl-1">
                  <li>Custom chocolate piped name or message on cake</li>
                  <li>Complimentary birthday candle set &amp; cake cutting knife</li>
                  <li>Special sugar-reduction or extra-garnishing requests accepted</li>
                </ul>
              </div>

              {/* Delivery Disclaimer Notice */}
              <div className="p-3 bg-amber-50/70 border border-amber-200/70 rounded-xl text-xs text-amber-900 flex items-start gap-2.5">
                <Truck className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <div className="leading-relaxed">
                  <strong>Local Delivery in Bhayandar &amp; Mira Road:</strong> Delivery charges may vary based on your exact locality. Our team will confirm the final delivery charge and timing before confirming your order.
                </div>
              </div>
            </div>

            {/* Action CTAs */}
            <div className="pt-4 border-t border-[#FAF5EE] space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Primary CTA */}
                <button
                  type="button"
                  onClick={() => setModalOpen(true)}
                  className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-xl bg-gradient-to-r from-[#3E2313] to-[#684128] hover:from-[#2C180D] hover:to-[#4A2E1B] text-amber-100 hover:text-white font-bold text-sm shadow-md hover:shadow-lg transition-all active:scale-98"
                  id="btn-order-cake"
                >
                  <ShoppingBag className="w-4 h-4 text-amber-300" />
                  <span>Order This Cake</span>
                </button>

                {/* Secondary CTA: WhatsApp */}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all"
                  id="btn-order-whatsapp"
                >
                  <MessageCircle className="w-4 h-4 fill-white/20" />
                  <span>Order via WhatsApp</span>
                </a>
              </div>

              <div className="flex items-center justify-center gap-6 text-[11px] text-stone-500 pt-1">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Freshness Guaranteed
                </span>
                <span className="flex items-center gap-1">
                  <Store className="w-3.5 h-3.5 text-amber-700" /> Store Pickup Available
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Related Cakes Section */}
        {relatedProducts && relatedProducts.length > 0 && (
          <div className="mt-16">
            <h3 className="font-serif text-2xl font-bold text-[#2C180D] mb-6">
              You Might Also Love
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.slice(0, 4).map((rel) => (
                <div
                  key={rel.id}
                  className="bg-white rounded-2xl overflow-hidden border border-[#E7D5C7] p-4 flex flex-col justify-between hover:shadow-md transition-all"
                >
                  <Link href={`/cakes/${rel.slug}`} className="block">
                    <div className="relative aspect-square rounded-xl overflow-hidden mb-3 bg-[#FAF5EE]">
                      <Image src={rel.image_url} alt={rel.name} fill className="object-cover" />
                    </div>
                    <h4 className="font-serif text-sm font-bold text-[#2C180D] line-clamp-1">
                      {rel.name}
                    </h4>
                    <p className="text-xs text-stone-500 line-clamp-1 mt-0.5">
                      {rel.description}
                    </p>
                  </Link>
                  <div className="flex items-center justify-between mt-3 pt-2 border-t border-[#FAF5EE]">
                    <span className="font-bold text-sm text-[#3E2313]">₹{rel.price}</span>
                    <Link
                      href={`/cakes/${rel.slug}`}
                      className="text-xs font-bold text-amber-800 hover:underline"
                    >
                      View →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Order Modal */}
      <OrderModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        product={product}
        selectedSize={selectedSize}
      />
    </div>
  );
}
