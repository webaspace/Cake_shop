'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Product } from '@/types/product';
import CakeCard from '@/components/cakes/CakeCard';
import OrderModal from '@/components/cakes/OrderModal';

interface FeaturedCakesProps {
  products: Product[];
}

export default function FeaturedCakes({ products }: FeaturedCakesProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>('500g');

  const handleOrderClick = (product: Product, size: string) => {
    setSelectedProduct(product);
    setSelectedSize(size);
    setModalOpen(true);
  };

  return (
    <section className="py-16 bg-[#FAF5EE]/60 border-b border-[#E7D5C7]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-800 mb-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Customer Favorites</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl font-extrabold text-[#2C180D] tracking-tight">
              Featured Celebration Cakes
            </h2>
            <p className="text-sm text-stone-500 mt-1">
              Our most-loved handcrafted creations baked fresh for Bhayandar celebrations.
            </p>
          </div>

          <Link
            href="/cakes"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-[#E7D5C7] text-xs sm:text-sm font-bold text-[#3E2313] hover:bg-[#3E2313] hover:text-white transition-all shadow-xs"
          >
            <span>Explore All Cakes</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Products Grid (6-8 items) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.slice(0, 8).map((product) => (
            <CakeCard
              key={product.id}
              product={product}
              onOrderClick={handleOrderClick}
            />
          ))}
        </div>
      </div>

      {/* Quick Order Modal */}
      <OrderModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        product={selectedProduct}
        selectedSize={selectedSize}
      />
    </section>
  );
}
