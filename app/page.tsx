import React from 'react';
import HeroSection from '@/components/home/HeroSection';
import TrustSection from '@/components/home/TrustSection';
import CategoryGrid from '@/components/home/CategoryGrid';
import FeaturedCakes from '@/components/home/FeaturedCakes';
import CustomCakeCTA from '@/components/home/CustomCakeCTA';
import HowItWorks from '@/components/home/HowItWorks';
import ReviewsSection from '@/components/home/ReviewsSection';
import LocationSection from '@/components/home/LocationSection';
import { getCategories, getProducts, getApprovedReviews } from '@/lib/data-service';

export const revalidate = 60; // ISR revalidation

export default async function HomePage() {
  const [categories, featuredProducts, reviews] = await Promise.all([
    getCategories(),
    getProducts({ featuredOnly: true }),
    getApprovedReviews(),
  ]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Trust Pillars */}
      <TrustSection />

      {/* 3. Visual Categories */}
      <CategoryGrid categories={categories} />

      {/* 4. Featured Cakes (6-8 products) */}
      <FeaturedCakes products={featuredProducts} />

      {/* 5. Custom Cake Showcase Spotlight */}
      <CustomCakeCTA />

      {/* 6. How It Works (3 Steps) */}
      <HowItWorks />

      {/* 7. Customer Reviews */}
      <ReviewsSection initialReviews={reviews} />

      {/* 8. Local Bakery Location & Directions */}
      <LocationSection />
      
    </div>
  );
}
