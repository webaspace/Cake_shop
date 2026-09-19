import { Product, Category } from '@/types/product';
import { Order, OrderInput, OrderStatus } from '@/types/order';
import { Review, ReviewInput } from '@/types/review';
import { SEED_CATEGORIES, SEED_PRODUCTS, SEED_REVIEWS, INITIAL_ORDERS } from '@/lib/seed-data';
import { supabase, isSupabaseConfigured } from '@/lib/supabase/client';

// Local storage key constants for seamless client persistence in demo mode
const STORAGE_KEYS = {
  PRODUCTS: 'mcs_products_v1',
  CATEGORIES: 'mcs_categories_v1',
  ORDERS: 'mcs_orders_v1',
  REVIEWS: 'mcs_reviews_v1',
};

function getLocalData<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) {
      localStorage.setItem(key, JSON.stringify(fallback));
      return fallback;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.warn(`Error reading ${key} from storage:`, err);
    return fallback;
  }
}

function setLocalData<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.warn(`Error writing ${key} to storage:`, err);
  }
}

// -------------------------------------------------------------
// CATEGORIES
// -------------------------------------------------------------
export async function getCategories(): Promise<Category[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('active', true)
        .order('sort_order', { ascending: true });
      if (!error && data && data.length > 0) return data as Category[];
    } catch (err) {
      console.warn('Supabase getCategories error, falling back to local:', err);
    }
  }

  return getLocalData<Category[]>(STORAGE_KEYS.CATEGORIES, SEED_CATEGORIES).filter(c => c.active);
}

// -------------------------------------------------------------
// PRODUCTS
// -------------------------------------------------------------
export interface ProductFilterOptions {
  categorySlug?: string;
  search?: string;
  egglessOnly?: boolean;
  featuredOnly?: boolean;
  sort?: 'popular' | 'price-asc' | 'price-desc' | 'name-asc';
  minPrice?: number;
  maxPrice?: number;
}

export async function getProducts(options: ProductFilterOptions = {}): Promise<Product[]> {
  let products: Product[] = [];

  if (isSupabaseConfigured && supabase) {
    try {
      let query = supabase.from('products').select('*, category:categories(*)').eq('available', true);

      if (options.featuredOnly) {
        query = query.eq('featured', true);
      }
      if (options.egglessOnly) {
        query = query.eq('eggless', true);
      }
      if (options.minPrice !== undefined) {
        query = query.gte('price', options.minPrice);
      }
      if (options.maxPrice !== undefined) {
        query = query.lte('price', options.maxPrice);
      }

      const { data, error } = await query;
      if (!error && data && data.length > 0) {
        products = data as Product[];
      } else {
        products = getLocalData<Product[]>(STORAGE_KEYS.PRODUCTS, SEED_PRODUCTS);
      }
    } catch (err) {
      console.warn('Supabase getProducts error, falling back to local:', err);
      products = getLocalData<Product[]>(STORAGE_KEYS.PRODUCTS, SEED_PRODUCTS);
    }
  } else {
    products = getLocalData<Product[]>(STORAGE_KEYS.PRODUCTS, SEED_PRODUCTS);
  }

  // Filter in memory for robust multi-field handling
  const categories = await getCategories();
  const categoryMap = new Map(categories.map(c => [c.id, c]));

  products = products.map(p => ({
    ...p,
    category: p.category || categoryMap.get(p.category_id),
  }));

  if (options.categorySlug && options.categorySlug !== 'all') {
    products = products.filter(p => p.category?.slug === options.categorySlug);
  }

  if (options.featuredOnly) {
    products = products.filter(p => p.featured);
  }

  if (options.egglessOnly) {
    products = products.filter(p => p.eggless);
  }

  if (options.minPrice !== undefined) {
    products = products.filter(p => p.price >= options.minPrice!);
  }

  if (options.maxPrice !== undefined) {
    products = products.filter(p => p.price <= options.maxPrice!);
  }

  if (options.search && options.search.trim()) {
    const term = options.search.trim().toLowerCase();
    products = products.filter(p =>
      p.name.toLowerCase().includes(term) ||
      p.description.toLowerCase().includes(term) ||
      p.flavor?.toLowerCase().includes(term) ||
      p.tags?.some(tag => tag.toLowerCase().includes(term))
    );
  }

  // Sorting
  if (options.sort === 'price-asc') {
    products.sort((a, b) => a.price - b.price);
  } else if (options.sort === 'price-desc') {
    products.sort((a, b) => b.price - a.price);
  } else if (options.sort === 'name-asc') {
    products.sort((a, b) => a.name.localeCompare(b.name));
  } else {
    // Default 'popular' / featured first
    products.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
  }

  return products;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*, category:categories(*)')
        .eq('slug', slug)
        .single();
      if (!error && data) return data as Product;
    } catch (err) {
      console.warn(`Supabase getProductBySlug error for ${slug}:`, err);
    }
  }

  const products = await getProducts();
  const found = products.find(p => p.slug === slug);
  return found || null;
}

// -------------------------------------------------------------
// ORDERS
// -------------------------------------------------------------
function generateOrderNumber(): string {
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  return `MCS-${randomNum}`;
}

export async function createOrder(input: OrderInput): Promise<Order> {
  const newOrder: Order = {
    ...input,
    id: `ord-${Date.now()}`,
    order_number: generateOrderNumber(),
    status: 'pending',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('orders')
        .insert([
          {
            order_number: newOrder.order_number,
            customer_name: newOrder.customer_name,
            phone: newOrder.phone,
            whatsapp: newOrder.whatsapp,
            email: newOrder.email || null,
            product_id: newOrder.product_id || null,
            product_name: newOrder.product_name,
            quantity: newOrder.quantity,
            size: newOrder.size,
            unit_price: newOrder.unit_price,
            total_estimated_price: newOrder.total_estimated_price,
            cake_message: newOrder.cake_message || null,
            special_instructions: newOrder.special_instructions || null,
            fulfilment_type: newOrder.fulfilment_type,
            delivery_address: newOrder.delivery_address || null,
            delivery_area: newOrder.delivery_area || null,
            pincode: newOrder.pincode || null,
            preferred_date: newOrder.preferred_date,
            preferred_time: newOrder.preferred_time,
            status: 'pending',
          },
        ])
        .select()
        .single();

      if (!error && data) {
        return data as Order;
      }
    } catch (err) {
      console.warn('Supabase createOrder error, falling back to local:', err);
    }
  }

  // Local storage save
  const currentOrders = getLocalData<Order[]>(STORAGE_KEYS.ORDERS, INITIAL_ORDERS);
  const updatedOrders = [newOrder, ...currentOrders];
  setLocalData(STORAGE_KEYS.ORDERS, updatedOrders);
  return newOrder;
}

export async function getOrderByIdOrNumber(identifier: string): Promise<Order | null> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .or(`id.eq.${identifier},order_number.eq.${identifier}`)
        .single();
      if (!error && data) return data as Order;
    } catch (err) {
      console.warn('Supabase getOrderByIdOrNumber error:', err);
    }
  }

  const orders = getLocalData<Order[]>(STORAGE_KEYS.ORDERS, INITIAL_ORDERS);
  const order = orders.find(o => o.id === identifier || o.order_number === identifier);
  return order || null;
}

export async function getAllOrders(): Promise<Order[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });
      if (!error && data) return data as Order[];
    } catch (err) {
      console.warn('Supabase getAllOrders error:', err);
    }
  }

  return getLocalData<Order[]>(STORAGE_KEYS.ORDERS, INITIAL_ORDERS);
}

export async function updateOrderStatus(
  orderId: string,
  status: OrderStatus,
  deliveryCharges?: number
): Promise<boolean> {
  if (isSupabaseConfigured && supabase) {
    try {
      const updatePayload: Record<string, unknown> = { status, updated_at: new Date().toISOString() };
      if (deliveryCharges !== undefined) {
        updatePayload.delivery_charges_confirmed = deliveryCharges;
      }

      const { error } = await supabase
        .from('orders')
        .update(updatePayload)
        .eq('id', orderId);
      if (!error) return true;
    } catch (err) {
      console.warn('Supabase updateOrderStatus error:', err);
    }
  }

  const orders = getLocalData<Order[]>(STORAGE_KEYS.ORDERS, INITIAL_ORDERS);
  const updated = orders.map(o => {
    if (o.id === orderId || o.order_number === orderId) {
      return {
        ...o,
        status,
        delivery_charges_confirmed: deliveryCharges !== undefined ? deliveryCharges : o.delivery_charges_confirmed,
        updated_at: new Date().toISOString(),
      };
    }
    return o;
  });
  setLocalData(STORAGE_KEYS.ORDERS, updated);
  return true;
}

// -------------------------------------------------------------
// REVIEWS
// -------------------------------------------------------------
export async function getApprovedReviews(): Promise<Review[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('approved', true)
        .order('created_at', { ascending: false });
      if (!error && data && data.length > 0) return data as Review[];
    } catch (err) {
      console.warn('Supabase getApprovedReviews error:', err);
    }
  }

  const reviews = getLocalData<Review[]>(STORAGE_KEYS.REVIEWS, SEED_REVIEWS);
  return reviews.filter(r => r.approved);
}

export async function getAllReviews(): Promise<Review[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .order('created_at', { ascending: false });
      if (!error && data) return data as Review[];
    } catch (err) {
      console.warn('Supabase getAllReviews error:', err);
    }
  }

  return getLocalData<Review[]>(STORAGE_KEYS.REVIEWS, SEED_REVIEWS);
}

export async function submitReview(input: ReviewInput): Promise<Review> {
  const newReview: Review = {
    ...input,
    id: `rev-${Date.now()}`,
    approved: false, // Moderated by admin
    created_at: new Date().toISOString(),
  };

  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .insert([
          {
            customer_name: newReview.customer_name,
            rating: newReview.rating,
            review: newReview.review,
            cake_ordered: newReview.cake_ordered || null,
            occasion: newReview.occasion || null,
            approved: false,
          },
        ])
        .select()
        .single();
      if (!error && data) return data as Review;
    } catch (err) {
      console.warn('Supabase submitReview error:', err);
    }
  }

  const reviews = getLocalData<Review[]>(STORAGE_KEYS.REVIEWS, SEED_REVIEWS);
  setLocalData(STORAGE_KEYS.REVIEWS, [newReview, ...reviews]);
  return newReview;
}

export async function updateReviewApproval(id: string, approved: boolean): Promise<boolean> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase.from('reviews').update({ approved }).eq('id', id);
      if (!error) return true;
    } catch (err) {
      console.warn('Supabase updateReviewApproval error:', err);
    }
  }

  const reviews = getLocalData<Review[]>(STORAGE_KEYS.REVIEWS, SEED_REVIEWS);
  const updated = reviews.map(r => (r.id === id ? { ...r, approved } : r));
  setLocalData(STORAGE_KEYS.REVIEWS, updated);
  return true;
}

// -------------------------------------------------------------
// PRODUCT ADMIN OPERATIONS
// -------------------------------------------------------------
export async function saveProduct(product: Partial<Product> & { name: string; price: number }): Promise<Product> {
  const slug = product.slug || product.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const id = product.id || `prod-${Date.now()}`;

  const fullProduct: Product = {
    id,
    name: product.name,
    slug,
    description: product.description || '',
    price: product.price,
    category_id: product.category_id || SEED_CATEGORIES[0].id,
    image_url: product.image_url || 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1000&q=80',
    gallery: product.gallery || [],
    eggless: product.eggless ?? true,
    featured: product.featured ?? false,
    available: product.available ?? true,
    sizes: product.sizes || [
      { size: '500g', price: product.price, label: '0.5 kg (Serves 4-6)' },
      { size: '1kg', price: Math.round(product.price * 1.9), label: '1.0 kg (Serves 8-12)' },
    ],
    customization_available: product.customization_available ?? true,
    flavor: product.flavor || 'Fresh Bakery Sponge',
    tags: product.tags || ['Handcrafted'],
    updated_at: new Date().toISOString(),
  };

  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('products')
        .upsert(fullProduct)
        .select()
        .single();
      if (!error && data) return data as Product;
    } catch (err) {
      console.warn('Supabase saveProduct error:', err);
    }
  }

  const products = getLocalData<Product[]>(STORAGE_KEYS.PRODUCTS, SEED_PRODUCTS);
  const existingIndex = products.findIndex(p => p.id === fullProduct.id);
  let updatedProducts: Product[];
  if (existingIndex >= 0) {
    updatedProducts = [...products];
    updatedProducts[existingIndex] = fullProduct;
  } else {
    updatedProducts = [fullProduct, ...products];
  }
  setLocalData(STORAGE_KEYS.PRODUCTS, updatedProducts);
  return fullProduct;
}

export async function deleteProduct(id: string): Promise<boolean> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase.from('products').delete().eq('id', id);
      if (!error) return true;
    } catch (err) {
      console.warn('Supabase deleteProduct error:', err);
    }
  }

  const products = getLocalData<Product[]>(STORAGE_KEYS.PRODUCTS, SEED_PRODUCTS);
  const filtered = products.filter(p => p.id !== id);
  setLocalData(STORAGE_KEYS.PRODUCTS, filtered);
  return true;
}
