import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { Category } from '@/types/product';

interface CategoryGridProps {
  categories: Category[];
}

export default function CategoryGrid({ categories }: CategoryGridProps) {
  return (
    <section className="py-16 bg-[#FDFBF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800 block mb-1">
              Explore Our Creations
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-extrabold text-[#2C180D] tracking-tight">
              Browse by Category
            </h2>
          </div>
          <Link
            href="/cakes"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-[#684128] hover:text-[#2C180D] transition-colors"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/cakes?category=${category.slug}`}
              className="group relative rounded-2xl overflow-hidden aspect-4/3 bg-[#FAF5EE] border border-[#E7D5C7]/80 shadow-xs hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* Category background image */}
              <Image
                src={category.image_url}
                alt={category.name}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              {/* Subtle dark gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent group-hover:from-black/85 transition-colors" />

              {/* Title & arrow */}
              <div className="absolute bottom-0 inset-x-0 p-3.5 sm:p-4 text-white flex items-end justify-between">
                <div>
                  <h3 className="font-serif text-sm sm:text-base font-bold leading-tight group-hover:text-amber-200 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-[10px] sm:text-xs text-stone-300 line-clamp-1 mt-0.5 opacity-90">
                    {category.description}
                  </p>
                </div>
                <div className="w-6 h-6 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center shrink-0 group-hover:bg-amber-500 transition-colors">
                  <ArrowRight className="w-3.5 h-3.5 text-white" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
