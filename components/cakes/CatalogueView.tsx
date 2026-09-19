'use client';

import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { Product, Category } from '@/types/product';
import CakeCard from '@/components/cakes/CakeCard';
import CakeFilters from '@/components/cakes/CakeFilters';
import OrderModal from '@/components/cakes/OrderModal';
import { Cake, Sparkles, Frown } from 'lucide-react';

interface CatalogueViewProps {
  initialProducts: Product[];
  categories: Category[];
}

const ITEMS_PER_PAGE = 12;

export default function CatalogueView({ initialProducts, categories }: CatalogueViewProps) {
  const searchParams = useSearchParams();
  const initialCategoryParam = searchParams.get('category') || 'all';

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategoryParam);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [egglessOnly, setEgglessOnly] = useState<boolean>(false);
  const [sortOption, setSortOption] = useState<'popular' | 'price-asc' | 'price-desc' | 'name-asc'>('popular');
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Modal states
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>('500g');

  const handleOrderClick = (product: Product, size: string) => {
    setSelectedProduct(product);
    setSelectedSize(size);
    setModalOpen(true);
  };

  // Filter & sort logic in memory
  const filteredProducts = useMemo(() => {
    let list = [...initialProducts];

    // Category
    if (selectedCategory && selectedCategory !== 'all') {
      list = list.filter((p) => p.category?.slug === selectedCategory);
    }

    // Eggless
    if (egglessOnly) {
      list = list.filter((p) => p.eggless);
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.flavor?.toLowerCase().includes(q) ||
          p.tags?.some((t) => t.toLowerCase().includes(q))
      );
    }

    // Sorting
    if (sortOption === 'price-asc') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'price-desc') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortOption === 'name-asc') {
      list.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return list;
  }, [initialProducts, selectedCategory, egglessOnly, searchQuery, sortOption]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE) || 1;
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  const handleCategoryChange = (slug: string) => {
    setSelectedCategory(slug);
    setCurrentPage(1);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleEgglessToggle = (eggless: boolean) => {
    setEgglessOnly(eggless);
    setCurrentPage(1);
  };

  return (
    <div className="py-8 sm:py-12 bg-[#FDFBF7] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Title */}
        <div className="mb-8 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-800 mb-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Freshly Baked Every Morning</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-[#2C180D] tracking-tight">
            Our Cake Catalogue
          </h1>
          <p className="text-sm text-stone-500 mt-2 max-w-2xl">
            Explore handcrafted chocolate truffles, authentic Rasmalai fusion cakes, photo cakes, and designer celebration cakes. Available in custom sizes from 0.5 kg to 4 kg.
          </p>
        </div>

        {/* Filters */}
        <CakeFilters
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={handleCategoryChange}
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          egglessOnly={egglessOnly}
          onToggleEggless={handleEgglessToggle}
          sortOption={sortOption}
          onSortChange={setSortOption}
          totalResults={filteredProducts.length}
        />

        {/* Products Grid */}
        {paginatedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {paginatedProducts.map((product) => (
              <CakeCard
                key={product.id}
                product={product}
                onOrderClick={handleOrderClick}
              />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-16 px-4 bg-white rounded-2xl border border-[#E7D5C7] max-w-md mx-auto my-8">
            <div className="w-16 h-16 rounded-2xl bg-[#FAF5EE] text-[#3E2313] flex items-center justify-center mx-auto mb-4">
              <Cake className="w-8 h-8 text-amber-700 opacity-60" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#2C180D] mb-1">
              No Cakes Found
            </h3>
            <p className="text-xs text-stone-500 mb-6 leading-relaxed">
              We couldn&apos;t find any cakes matching your selected filters or search terms. Try searching for &apos;truffle&apos; or resetting your filters.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
                setEgglessOnly(false);
              }}
              className="px-5 py-2.5 rounded-xl bg-[#3E2313] text-amber-100 text-xs font-bold hover:bg-[#2C180D] transition-colors"
            >
              Show All Cakes
            </button>
          </div>
        )}

        {/* Pagination Bar */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center space-x-2 mt-12">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="px-3.5 py-2 rounded-xl border border-[#E7D5C7] bg-white text-xs font-semibold text-[#2C180D] hover:bg-[#FAF5EE] disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Previous
            </button>

            {[...Array(totalPages)].map((_, i) => {
              const pageNum = i + 1;
              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`w-9 h-9 rounded-xl text-xs font-bold transition-all ${
                    currentPage === pageNum
                      ? 'bg-[#3E2313] text-white shadow-xs'
                      : 'bg-white border border-[#E7D5C7] text-stone-700 hover:bg-[#FAF5EE]'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="px-3.5 py-2 rounded-xl border border-[#E7D5C7] bg-white text-xs font-semibold text-[#2C180D] hover:bg-[#FAF5EE] disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* Order Modal */}
      <OrderModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        product={selectedProduct}
        selectedSize={selectedSize}
      />
    </div>
  );
}
