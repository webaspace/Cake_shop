'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Check,
  X,
  Sparkles,
  Package,
  AlertCircle,
} from 'lucide-react';
import { getProducts, getCategories, saveProduct, deleteProduct } from '@/lib/data-service';
import { Product, Category } from '@/types/product';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function load() {
      const [p, c] = await Promise.all([getProducts(), getCategories()]);
      setProducts(p);
      setCategories(c);
    }
    load();
  }, []);

  const handleCreateClick = () => {
    setIsNew(true);
    setEditingProduct({
      name: '',
      slug: '',
      description: '',
      price: 500,
      category_id: categories[0]?.id || '',
      image_url: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1000&q=80',
      eggless: true,
      featured: false,
      available: true,
      flavor: 'Bakery Special',
      sizes: [
        { size: '500g', price: 500, label: '0.5 kg (Serves 4-6)' },
        { size: '1kg', price: 950, label: '1.0 kg (Serves 8-12)' },
      ],
    });
    setModalOpen(true);
  };

  const handleEditClick = (product: Product) => {
    setIsNew(false);
    setEditingProduct({ ...product });
    setModalOpen(true);
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) return;
    await deleteProduct(id);
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const handleToggleFeatured = async (product: Product) => {
    const updated = await saveProduct({
      ...product,
      featured: !product.featured,
    });
    setProducts((prev) => prev.map((p) => (p.id === product.id ? updated : p)));
  };

  const handleToggleAvailable = async (product: Product) => {
    const updated = await saveProduct({
      ...product,
      available: !product.available,
    });
    setProducts((prev) => prev.map((p) => (p.id === product.id ? updated : p)));
  };

  const handleSaveSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct?.name || !editingProduct?.price) return;
    setSaving(true);
    try {
      const saved = await saveProduct(editingProduct as any);
      if (isNew) {
        setProducts([saved, ...products]);
      } else {
        setProducts(products.map((p) => (p.id === saved.id ? saved : p)));
      }
      setModalOpen(false);
    } catch (err) {
      console.error('Error saving product:', err);
    } finally {
      setSaving(false);
    }
  };

  const filtered = products.filter((p) => {
    const matchesCat =
      selectedCategory === 'all' || p.category_id === selectedCategory || p.category?.slug === selectedCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch = !q || p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q);
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#2C180D]">
            Cake Catalogue Management
          </h1>
          <p className="text-xs text-stone-500 mt-0.5">
            Add, update prices, manage eggless recipes, and feature bestsellers.
          </p>
        </div>

        <button
          type="button"
          onClick={handleCreateClick}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#3E2313] hover:bg-[#2C180D] text-amber-100 font-bold text-xs shadow-md transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Cake</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-2xl p-4 border border-[#E7D5C7] shadow-xs flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products by title..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-[#E7D5C7] text-xs focus:outline-none focus:ring-2 focus:ring-[#684128]/30"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 rounded-xl border border-[#E7D5C7] bg-white text-xs text-[#2C180D]"
          >
            <option value="all">All Categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Product List */}
      <div className="bg-white rounded-2xl border border-[#E7D5C7] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#2C180D]">
            <thead className="bg-[#FAF5EE] text-stone-600 font-semibold border-b border-[#E7D5C7]">
              <tr>
                <th className="py-3 px-4">Cake</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Base Price</th>
                <th className="py-3 px-4">Dietary</th>
                <th className="py-3 px-4 text-center">Featured</th>
                <th className="py-3 px-4 text-center">Available</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#FAF5EE]">
              {filtered.map((product) => (
                <tr key={product.id} className="hover:bg-[#FDFBF7] transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-3">
                      <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-stone-100 shrink-0">
                        <Image
                          src={product.image_url}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-bold text-sm text-[#2C180D]">{product.name}</div>
                        <div className="text-[11px] text-stone-500 line-clamp-1">
                          {product.flavor || product.description}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-stone-600">
                    {product.category?.name || 'Bakery'}
                  </td>
                  <td className="py-3 px-4 font-bold text-[#3E2313]">
                    ₹{product.price}
                  </td>
                  <td className="py-3 px-4">
                    {product.eggless ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        <span className="veg-badge scale-75">
                          <span className="veg-badge-dot" />
                        </span>
                        Eggless
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-800 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
                        Contains Egg
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button
                      type="button"
                      onClick={() => handleToggleFeatured(product)}
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase transition-colors ${
                        product.featured
                          ? 'bg-amber-100 text-amber-900 border border-amber-300'
                          : 'bg-stone-100 text-stone-400 hover:text-stone-700'
                      }`}
                    >
                      {product.featured ? '★ Featured' : 'Normal'}
                    </button>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button
                      type="button"
                      onClick={() => handleToggleAvailable(product)}
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase transition-colors ${
                        product.available
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {product.available ? 'In Stock' : 'Sold Out'}
                    </button>
                  </td>
                  <td className="py-3 px-4 text-right space-x-2">
                    <button
                      onClick={() => handleEditClick(product)}
                      className="p-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors"
                      title="Edit Cake"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(product.id, product.name)}
                      className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 transition-colors"
                      title="Delete Cake"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Product Modal */}
      {modalOpen && editingProduct && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 border border-[#E7D5C7] shadow-2xl relative">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute right-4 top-4 p-1.5 text-stone-400 hover:text-stone-700"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-serif text-xl font-bold text-[#2C180D] mb-4">
              {isNew ? 'Create New Cake' : 'Edit Cake Details'}
            </h3>

            <form onSubmit={handleSaveSubmit} className="space-y-4 text-xs">
              <div>
                <label className="font-semibold text-stone-700 block mb-1">
                  Cake Name *
                </label>
                <input
                  type="text"
                  required
                  value={editingProduct.name || ''}
                  onChange={(e) =>
                    setEditingProduct({ ...editingProduct, name: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-[#E7D5C7]"
                  placeholder="e.g. Belgian Dark Chocolate Truffle"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-stone-700 block mb-1">
                    Base Price (₹) *
                  </label>
                  <input
                    type="number"
                    required
                    value={editingProduct.price || ''}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        price: parseFloat(e.target.value) || 0,
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-[#E7D5C7]"
                    placeholder="550"
                  />
                </div>

                <div>
                  <label className="font-semibold text-stone-700 block mb-1">
                    Category *
                  </label>
                  <select
                    value={editingProduct.category_id}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, category_id: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-[#E7D5C7] bg-white"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="font-semibold text-stone-700 block mb-1">
                  Image URL (Unsplash or Supabase Storage URL) *
                </label>
                <input
                  type="url"
                  required
                  value={editingProduct.image_url || ''}
                  onChange={(e) =>
                    setEditingProduct({ ...editingProduct, image_url: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-[#E7D5C7]"
                  placeholder="https://..."
                />
              </div>

              <div>
                <label className="font-semibold text-stone-700 block mb-1">
                  Flavor Profile
                </label>
                <input
                  type="text"
                  value={editingProduct.flavor || ''}
                  onChange={(e) =>
                    setEditingProduct({ ...editingProduct, flavor: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-[#E7D5C7]"
                  placeholder="e.g. Dark Ganache & Belgian Chocolate"
                />
              </div>

              <div>
                <label className="font-semibold text-stone-700 block mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={editingProduct.description || ''}
                  onChange={(e) =>
                    setEditingProduct({ ...editingProduct, description: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-[#E7D5C7]"
                  placeholder="Describe the layers, sponge softness, and garnishing..."
                />
              </div>

              <div className="flex flex-wrap gap-4 pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingProduct.eggless ?? true}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, eggless: e.target.checked })
                    }
                    className="rounded text-[#3E2313] focus:ring-[#3E2313]"
                  />
                  <span className="font-semibold text-stone-700">100% Eggless</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingProduct.featured ?? false}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, featured: e.target.checked })
                    }
                    className="rounded text-[#3E2313] focus:ring-[#3E2313]"
                  />
                  <span className="font-semibold text-stone-700">Mark as Featured</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingProduct.available ?? true}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, available: e.target.checked })
                    }
                    className="rounded text-[#3E2313] focus:ring-[#3E2313]"
                  />
                  <span className="font-semibold text-stone-700">In Stock / Available</span>
                </label>
              </div>

              <div className="pt-3 border-t border-[#FAF5EE] flex gap-2">
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 py-3 px-4 rounded-xl bg-[#3E2313] hover:bg-[#2C180D] text-amber-100 font-bold text-xs shadow-md transition-all disabled:opacity-50"
                >
                  {saving ? 'Saving...' : isNew ? 'Create Cake' : 'Save Changes'}
                </button>
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="py-3 px-4 rounded-xl bg-stone-100 text-stone-700 font-bold text-xs"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
