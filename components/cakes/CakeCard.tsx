'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MessageCircle, ShoppingBag, ArrowRight } from 'lucide-react';
import { Product } from '@/types/product';
import { generateProductInquiryUrl } from '@/lib/whatsapp';

interface CakeCardProps {
  product: Product;
  onOrderClick?: (product: Product, selectedSize: string) => void;
}

export default function CakeCard({ product, onOrderClick }: CakeCardProps) {
  const [selectedSize, setSelectedSize] = useState(
    product.sizes?.[0]?.size || '500g'
  );

  const activeSizeObj = product.sizes?.find((s) => s.size === selectedSize) || {
    size: selectedSize,
    price: product.price,
    label: selectedSize,
  };

  const whatsappInquiryUrl = generateProductInquiryUrl(product.name, selectedSize);

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-[#E7D5C7]/70 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col hover:-translate-y-1">
      {/* Product Image Container */}
      <div className="relative aspect-4/3 w-full overflow-hidden bg-[#FAF5EE]">
        <Image
          src={product.image_url}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Badges Overlay */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.eggless ? (
            <div className="inline-flex items-center gap-1.5 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-full text-xs font-semibold text-emerald-800 shadow-xs border border-emerald-100">
              <span className="veg-badge">
                <span className="veg-badge-dot"></span>
              </span>
              <span>100% Eggless</span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-1.5 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-full text-xs font-semibold text-rose-800 shadow-xs border border-rose-100">
              <span className="non-veg-badge">
                <span className="non-veg-badge-dot"></span>
              </span>
              <span>Contains Egg</span>
            </div>
          )}

          {product.featured && (
            <span className="bg-gradient-to-r from-amber-600 to-amber-500 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-xs uppercase tracking-wider">
              Bestseller
            </span>
          )}
        </div>

        {/* Category badge */}
        {product.category && (
          <div className="absolute bottom-3 left-3 z-10">
            <span className="bg-[#2C180D]/80 backdrop-blur-xs text-amber-100 text-[11px] font-medium px-2.5 py-1 rounded-lg">
              {product.category.name}
            </span>
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="p-5 flex flex-col flex-grow justify-between">
        <div>
          <Link href={`/cakes/${product.slug}`} className="block group/link">
            <h3 className="font-serif text-lg font-bold text-[#2C180D] group-hover/link:text-amber-700 transition-colors line-clamp-1 mb-1">
              {product.name}
            </h3>
          </Link>
          <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed mb-3">
            {product.description}
          </p>

          {/* Size Pills */}
          {product.sizes && product.sizes.length > 1 && (
            <div className="mb-4">
              <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider block mb-1.5">
                Select Size:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {product.sizes.map((s) => (
                  <button
                    key={s.size}
                    type="button"
                    onClick={() => setSelectedSize(s.size)}
                    className={`text-xs px-2.5 py-1 rounded-lg font-medium transition-all ${
                      selectedSize === s.size
                        ? 'bg-[#3E2313] text-white shadow-xs'
                        : 'bg-[#FAF5EE] text-[#4A2E1B] hover:bg-[#F3EAE0]'
                    }`}
                  >
                    {s.size}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Price & Action Area */}
        <div className="pt-3 border-t border-[#FAF5EE] mt-2">
          <div className="flex items-baseline justify-between mb-3">
            <div>
              <span className="text-xs text-stone-500 block">Estimated Price</span>
              <span className="text-xl font-bold text-[#2C180D]">
                ₹{activeSizeObj.price}
              </span>
            </div>
            <Link
              href={`/cakes/${product.slug}`}
              className="text-xs font-semibold text-amber-800 hover:text-amber-900 inline-flex items-center gap-1"
            >
              Details <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="grid grid-cols-5 gap-2">
            <button
              type="button"
              onClick={() => {
                if (onOrderClick) {
                  onOrderClick(product, selectedSize);
                } else {
                  window.location.href = `/cakes/${product.slug}`;
                }
              }}
              className="col-span-4 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#3E2313] to-[#4A2E1B] text-amber-100 hover:text-white text-xs font-bold shadow-xs hover:shadow-md transition-all active:scale-98"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-amber-300" />
              Order This Cake
            </button>

            <a
              href={whatsappInquiryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="col-span-1 flex items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 transition-colors"
              title="Quick WhatsApp Enquiry"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
