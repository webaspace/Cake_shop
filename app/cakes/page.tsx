import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import CatalogueView from '@/components/cakes/CatalogueView';
import { getCategories, getProducts } from '@/lib/data-service';

export const metadata: Metadata = {
  title: 'All Cakes & Desserts | Magic Cake Shop Bhayandar East',
  description:
    'Browse our complete menu of fresh cakes: Chocolate Truffle, Rasmalai, Red Velvet, Photo Cakes, Eggless cakes, and Fondant designs in Bhayandar.',
};

export const revalidate = 60;

export default async function CakesPage() {
  const [categories, products] = await Promise.all([
    getCategories(),
    getProducts(),
  ]);

  return (
    <Suspense
      fallback={
        <div className="py-24 text-center">
          <div className="animate-spin w-8 h-8 border-4 border-[#3E2313] border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-sm text-stone-500 font-medium">Loading freshly baked cakes...</p>
        </div>
      }
    >
      <CatalogueView initialProducts={products} categories={categories} />
    </Suspense>
  );
}
