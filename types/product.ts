export interface CakeSizeOption {
  size: string; // e.g. "500g", "1kg", "1.5kg", "2kg"
  price: number;
  label: string; // e.g. "0.5 kg (Serves 4-6)"
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image_url: string;
  active: boolean;
  sort_order?: number;
  created_at?: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  category_id: string;
  category?: Category;
  image_url: string;
  gallery?: string[];
  eggless: boolean;
  featured: boolean;
  available: boolean;
  sizes: CakeSizeOption[];
  customization_available: boolean;
  flavor?: string;
  tags?: string[];
  created_at?: string;
  updated_at?: string;
}
