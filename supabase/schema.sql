-- ==============================================================================
-- Magic Cake Shop - Supabase PostgreSQL Schema & Security Policies
-- Location: Bhayandar East, Maharashtra 401105
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. CATEGORIES TABLE
CREATE TABLE IF NOT EXISTS public.categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(120) NOT NULL UNIQUE,
    description TEXT,
    image_url TEXT,
    active BOOLEAN DEFAULT true,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. PRODUCTS TABLE
CREATE TABLE IF NOT EXISTS public.products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(200) NOT NULL,
    slug VARCHAR(220) NOT NULL UNIQUE,
    description TEXT NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
    image_url TEXT NOT NULL,
    gallery TEXT[] DEFAULT '{}',
    eggless BOOLEAN DEFAULT true,
    featured BOOLEAN DEFAULT false,
    available BOOLEAN DEFAULT true,
    sizes JSONB DEFAULT '[{"size": "500g", "price": 450, "label": "0.5 kg (Serves 4-6)"}, {"size": "1kg", "price": 850, "label": "1.0 kg (Serves 8-12)"}]'::jsonb,
    customization_available BOOLEAN DEFAULT true,
    flavor VARCHAR(100),
    tags TEXT[] DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. ORDERS TABLE
-- Fulfilment status: pending, contacted, confirmed, preparing, ready, completed, cancelled
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_number VARCHAR(50) NOT NULL UNIQUE,
    customer_name VARCHAR(150) NOT NULL,
    phone VARCHAR(30) NOT NULL,
    whatsapp VARCHAR(30) NOT NULL,
    email VARCHAR(200),
    product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
    product_name VARCHAR(200) NOT NULL,
    quantity INT DEFAULT 1 NOT NULL,
    size VARCHAR(50) NOT NULL,
    unit_price NUMERIC(10, 2) NOT NULL,
    total_estimated_price NUMERIC(10, 2) NOT NULL,
    cake_message TEXT,
    special_instructions TEXT,
    fulfilment_type VARCHAR(20) NOT NULL CHECK (fulfilment_type IN ('delivery', 'pickup')),
    delivery_address TEXT,
    delivery_area VARCHAR(100),
    pincode VARCHAR(20),
    preferred_date DATE NOT NULL,
    preferred_time VARCHAR(50) NOT NULL,
    status VARCHAR(30) DEFAULT 'pending' NOT NULL CHECK (status IN ('pending', 'contacted', 'confirmed', 'preparing', 'ready', 'completed', 'cancelled')),
    delivery_charges_confirmed NUMERIC(10, 2),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. REVIEWS TABLE
CREATE TABLE IF NOT EXISTS public.reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_name VARCHAR(150) NOT NULL,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    review TEXT NOT NULL,
    cake_ordered VARCHAR(150),
    occasion VARCHAR(100),
    approved BOOLEAN DEFAULT false NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. ADMINS TABLE (Mapped to Supabase Auth)
CREATE TABLE IF NOT EXISTS public.admins (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email VARCHAR(255) NOT NULL,
    full_name VARCHAR(150),
    role VARCHAR(50) DEFAULT 'admin' NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_products_category ON public.products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_featured ON public.products(featured);
CREATE INDEX IF NOT EXISTS idx_products_available ON public.products(available);
CREATE INDEX IF NOT EXISTS idx_orders_status ON public.orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created ON public.orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_reviews_approved ON public.reviews(approved);

-- Automatic updated_at trigger function
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER update_products_updated_at
    BEFORE UPDATE ON public.products
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

CREATE OR REPLACE TRIGGER update_orders_updated_at
    BEFORE UPDATE ON public.orders
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admins ENABLE ROW LEVEL SECURITY;

-- Categories Policies
CREATE POLICY "Public users can view active categories"
    ON public.categories FOR SELECT
    USING (active = true);

CREATE POLICY "Authenticated admins have full access to categories"
    ON public.categories FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- Products Policies
CREATE POLICY "Public users can view available products"
    ON public.products FOR SELECT
    USING (available = true);

CREATE POLICY "Authenticated admins have full access to products"
    ON public.products FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- Orders Policies
CREATE POLICY "Public users can insert orders"
    ON public.orders FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Authenticated admins have full access to orders"
    ON public.orders FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- Reviews Policies
CREATE POLICY "Public users can view approved reviews"
    ON public.reviews FOR SELECT
    USING (approved = true);

CREATE POLICY "Public users can submit reviews for moderation"
    ON public.reviews FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Authenticated admins have full access to reviews"
    ON public.reviews FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- Admins Policies
CREATE POLICY "Authenticated users can view admin profiles"
    ON public.admins FOR SELECT
    TO authenticated
    USING (true);
