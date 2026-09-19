'use client';

import React from 'react';
import { Search, X, SlidersHorizontal, Sparkles } from 'lucide-react';
import { Category } from '@/types/product';

interface CakeFiltersProps {
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (slug: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  egglessOnly: boolean;
  onToggleEggless: (eggless: boolean) => void;
  sortOption: string;
  onSortChange: (sort: 'popular' | 'price-asc' | 'price-desc' | 'name-asc') => void;
  totalResults: number;
}

export default function CakeFilters({
  categories,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  egglessOnly,
  onToggleEggless,
  sortOption,
  onSortChange,
  totalResults,
}: CakeFiltersProps) {
  const hasActiveFilters = selectedCategory !== 'all' || searchQuery.trim() !== '' || egglessOnly;

  return (
    <div className="bg-white rounded-2xl border border-[#E7D5C7]/70 p-4 sm:p-6 shadow-xs mb-8 space-y-5">
      {/* Top row: Search Bar & Sort Dropdown */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search cakes by name, flavor (e.g. Rasmalai, Truffle, Fruit)..."
            className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-[#E7D5C7] bg-[#FAF5EE]/40 text-sm text-[#2C180D] placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#684128]/30 focus:border-[#684128] transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Dietary toggle and Sort */}
        <div className="flex items-center gap-2.5 justify-between sm:justify-end">
          {/* Eggless only pill */}
          <button
            type="button"
            onClick={() => onToggleEggless(!egglessOnly)}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all ${
              egglessOnly
                ? 'bg-emerald-50 border-emerald-500 text-emerald-800 shadow-xs'
                : 'bg-white border-[#E7D5C7] text-stone-600 hover:bg-[#FAF5EE]'
            }`}
          >
            <span className="veg-badge scale-90">
              <span className="veg-badge-dot"></span>
            </span>
            <span>Eggless Only</span>
          </button>

          {/* Sort dropdown */}
          <div className="flex items-center gap-1.5 text-xs text-stone-600 bg-white border border-[#E7D5C7] rounded-xl px-3 py-1.5">
            <SlidersHorizontal className="w-3.5 h-3.5 text-stone-400" />
            <select
              value={sortOption}
              onChange={(e) => onSortChange(e.target.value as any)}
              className="bg-transparent text-xs font-medium text-[#2C180D] focus:outline-none cursor-pointer py-1"
            >
              <option value="popular">Bestsellers First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name-asc">Name: A to Z</option>
            </select>
          </div>
        </div>
      </div>

      {/* Category Pills */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
            Categories
          </span>
          {hasActiveFilters && (
            <button
              onClick={() => {
                onSelectCategory('all');
                onSearchChange('');
                onToggleEggless(false);
              }}
              className="text-xs text-amber-800 hover:underline font-medium"
            >
              Reset Filters
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-2 overflow-x-auto pb-1 scrollbar-none">
          <button
            type="button"
            onClick={() => onSelectCategory('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === 'all'
                ? 'bg-[#3E2313] text-white shadow-xs'
                : 'bg-[#FAF5EE] text-[#4A2E1B] hover:bg-[#F3EAE0]'
            }`}
          >
            All Cakes ({totalResults})
          </button>
          {categories.map((cat) => (
            <button
              key={cat.slug}
              type="button"
              onClick={() => onSelectCategory(cat.slug)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat.slug
                  ? 'bg-[#3E2313] text-white shadow-xs'
                  : 'bg-[#FAF5EE] text-[#4A2E1B] hover:bg-[#F3EAE0]'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
