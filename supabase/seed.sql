-- ==============================================================================
-- Magic Cake Shop - Supabase Seed Data
-- ==============================================================================

-- 1. SEED CATEGORIES
INSERT INTO public.categories (id, name, slug, description, image_url, active, sort_order)
VALUES
    ('c1111111-1111-1111-1111-111111111111', 'Birthday Cakes', 'birthday-cakes', 'Special handmade birthday cakes crafted to make celebrations memorable.', 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&w=800&q=80', true, 1),
    ('c2222222-2222-2222-2222-222222222222', 'Chocolate Cakes', 'chocolate-cakes', 'Rich Dutch truffle, dark chocolate ganache, and decadent cocoa creations.', 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80', true, 2),
    ('c3333333-3333-3333-3333-333333333333', 'Photo Cakes', 'photo-cakes', 'Custom edible photo printed cakes on smooth icing base.', 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&w=800&q=80', true, 3),
    ('c4444444-4444-4444-4444-444444444444', 'Anniversary Cakes', 'anniversary-cakes', 'Romantic heart-shaped, red velvet and tiered celebration cakes.', 'https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&w=800&q=80', true, 4),
    ('c5555555-5555-5555-5555-555555555555', 'Custom Cakes', 'custom-cakes', 'Themed fondant cakes, multi-tier designer cakes made to your vision.', 'https://images.unsplash.com/photo-1562440499-64c9a111f713?auto=format&fit=crop&w=800&q=80', true, 5),
    ('c6666666-6666-6666-6666-666666666666', 'Eggless Cakes', 'eggless-cakes', '100% pure vegetarian, ultra-soft sponge cakes baked fresh every morning.', 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=800&q=80', true, 6),
    ('c7777777-7777-7777-7777-777777777777', 'Kids Cakes', 'kids-cakes', 'Fun superhero, cartoon, Barbie, and jungle safari theme cakes.', 'https://images.unsplash.com/photo-1558301211-0d8c8ddee6ec?auto=format&fit=crop&w=800&q=80', true, 7),
    ('c8888888-8888-8888-8888-888888888888', 'Premium Cakes', 'premium-cakes', 'Exquisite Rasmalai, Biscoff cheesecake, Ferrero Rocher & Belgian luxury.', 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?auto=format&fit=crop&w=800&q=80', true, 8)
ON CONFLICT (id) DO NOTHING;

-- 2. SEED PRODUCTS
INSERT INTO public.products (id, name, slug, description, price, category_id, image_url, gallery, eggless, featured, available, sizes, customization_available, flavor)
VALUES
    (
        'p1111111-1111-1111-1111-111111111111',
        'Dutch Chocolate Truffle Cake',
        'dutch-chocolate-truffle-cake',
        'Rich, dense dark chocolate sponge layered with velvety Belgian chocolate truffle ganache and topped with handcrafted chocolate curls.',
        550,
        'c2222222-2222-2222-2222-222222222222',
        'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1000&q=80',
        ARRAY['https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1000&q=80'],
        true,
        true,
        true,
        '[{"size": "500g", "price": 550, "label": "0.5 kg (Serves 4-6)"}, {"size": "1kg", "price": 1050, "label": "1.0 kg (Serves 8-12)"}, {"size": "1.5kg", "price": 1550, "label": "1.5 kg (Serves 14-18)"}, {"size": "2kg", "price": 2000, "label": "2.0 kg (Serves 20-25)"}]'::jsonb,
        true,
        'Dark Chocolate'
    ),
    (
        'p2222222-2222-2222-2222-222222222222',
        'Royal Rasmalai Fusion Cake',
        'royal-rasmalai-fusion-cake',
        'A local Bhayandar customer favorite! Cardamom-infused soft sponge soaked in rich saffron milk (rabdi), layered with fresh Rasmalai pieces, pistachios, and dried rose petals.',
        650,
        'c8888888-8888-8888-8888-888888888888',
        'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=1000&q=80',
        ARRAY['https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=1000&q=80'],
        true,
        true,
        true,
        '[{"size": "500g", "price": 650, "label": "0.5 kg (Serves 4-6)"}, {"size": "1kg", "price": 1250, "label": "1.0 kg (Serves 8-12)"}, {"size": "1.5kg", "price": 1850, "label": "1.5 kg (Serves 14-18)"}, {"size": "2kg", "price": 2400, "label": "2.0 kg (Serves 20-25)"}]'::jsonb,
        true,
        'Rasmalai & Kesar Pista'
    ),
    (
        'p3333333-3333-3333-3333-333333333333',
        'Classic Red Velvet Cream Cheese Cake',
        'classic-red-velvet-cream-cheese-cake',
        'Vibrant crimson sponge with subtle cocoa undertones, frosted generously with silky vanilla-bean cream cheese frosting. Perfect for romantic anniversaries and special birthdays.',
        600,
        'c4444444-4444-4444-4444-444444444444',
        'https://images.unsplash.com/photo-1586788680434-30d324b2d46f?auto=format&fit=crop&w=1000&q=80',
        ARRAY['https://images.unsplash.com/photo-1586788680434-30d324b2d46f?auto=format&fit=crop&w=1000&q=80'],
        true,
        true,
        true,
        '[{"size": "500g", "price": 600, "label": "0.5 kg (Serves 4-6)"}, {"size": "1kg", "price": 1150, "label": "1.0 kg (Serves 8-12)"}, {"size": "1.5kg", "price": 1700, "label": "1.5 kg (Serves 14-18)"}, {"size": "2kg", "price": 2200, "label": "2.0 kg (Serves 20-25)"}]'::jsonb,
        true,
        'Red Velvet Cream Cheese'
    ),
    (
        'p4444444-4444-4444-4444-444444444444',
        'Fresh Fruit Gateau Cake',
        'fresh-fruit-gateau-cake',
        'Feather-light vanilla sponge layered with whipped mascarpone cream and an abundance of seasonal hand-cut kiwis, apples, oranges, grapes, and sweet cherries.',
        520,
        'c6666666-6666-6666-6666-666666666666',
        'https://images.unsplash.com/photo-1562440499-64c9a111f713?auto=format&fit=crop&w=1000&q=80',
        ARRAY['https://images.unsplash.com/photo-1562440499-64c9a111f713?auto=format&fit=crop&w=1000&q=80'],
        true,
        true,
        true,
        '[{"size": "500g", "price": 520, "label": "0.5 kg (Serves 4-6)"}, {"size": "1kg", "price": 990, "label": "1.0 kg (Serves 8-12)"}, {"size": "1.5kg", "price": 1450, "label": "1.5 kg (Serves 14-18)"}, {"size": "2kg", "price": 1900, "label": "2.0 kg (Serves 20-25)"}]'::jsonb,
        true,
        'Vanilla Fresh Fruit'
    ),
    (
        'p5555555-5555-5555-5555-555555555555',
        'Black Forest Celebration Cake',
        'black-forest-celebration-cake',
        'The timeless classic! Moist chocolate cake sponge layered with fresh dairy cream, red cherry compote, dark chocolate flakes, and maraschino cherries.',
        480,
        'c1111111-1111-1111-1111-111111111111',
        'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?auto=format&fit=crop&w=1000&q=80',
        ARRAY['https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?auto=format&fit=crop&w=1000&q=80'],
        true,
        true,
        true,
        '[{"size": "500g", "price": 480, "label": "0.5 kg (Serves 4-6)"}, {"size": "1kg", "price": 920, "label": "1.0 kg (Serves 8-12)"}, {"size": "1.5kg", "price": 1350, "label": "1.5 kg (Serves 14-18)"}, {"size": "2kg", "price": 1750, "label": "2.0 kg (Serves 20-25)"}]'::jsonb,
        true,
        'Chocolate Cherry'
    ),
    (
        'p6666666-6666-6666-6666-666666666666',
        'Lotus Biscoff Caramel Cheesecake',
        'lotus-biscoff-caramel-cheesecake',
        'Crunchy spiced Lotus Biscoff biscuit crust topped with silky baked cheesecake and smothered with warmed Biscoff spread and biscuit crumble.',
        720,
        'c8888888-8888-8888-8888-888888888888',
        'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=1000&q=80',
        ARRAY['https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=1000&q=80'],
        true,
        true,
        true,
        '[{"size": "500g", "price": 720, "label": "0.5 kg (Serves 4-6)"}, {"size": "1kg", "price": 1390, "label": "1.0 kg (Serves 8-12)"}, {"size": "1.5kg", "price": 2000, "label": "1.5 kg (Serves 14-18)"}, {"size": "2kg", "price": 2600, "label": "2.0 kg (Serves 20-25)"}]'::jsonb,
        false,
        'Lotus Biscoff & Caramel'
    ),
    (
        'p7777777-7777-7777-7777-777777777777',
        'Custom Edible Photo Birthday Cake',
        'custom-edible-photo-birthday-cake',
        'Your memorable photo printed in high resolution on 100% edible sugar sheets, framed with whipped cream rosettes. Choose your preferred sponge flavor.',
        580,
        'c3333333-3333-3333-3333-333333333333',
        'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&w=1000&q=80',
        ARRAY['https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&w=1000&q=80'],
        true,
        false,
        true,
        '[{"size": "1kg", "price": 1100, "label": "1.0 kg (Serves 8-12)"}, {"size": "1.5kg", "price": 1600, "label": "1.5 kg (Serves 14-18)"}, {"size": "2kg", "price": 2100, "label": "2.0 kg (Serves 20-25)"}]'::jsonb,
        true,
        'Choice of Chocolate, Pineapple, or Vanilla'
    ),
    (
        'p8888888-8888-8888-8888-888888888888',
        'Superhero & Cartoon Kids Fondant Cake',
        'superhero-kids-fondant-cake',
        'Fun, colorful 3D sculpted cake featuring your childs favorite superhero or cartoon theme. Hand-crafted with premium edible sugar paste.',
        850,
        'c7777777-7777-7777-7777-777777777777',
        'https://images.unsplash.com/photo-1558301211-0d8c8ddee6ec?auto=format&fit=crop&w=1000&q=80',
        ARRAY['https://images.unsplash.com/photo-1558301211-0d8c8ddee6ec?auto=format&fit=crop&w=1000&q=80'],
        true,
        false,
        true,
        '[{"size": "1kg", "price": 1450, "label": "1.0 kg (Serves 8-12)"}, {"size": "1.5kg", "price": 2100, "label": "1.5 kg (Serves 14-18)"}, {"size": "2kg", "price": 2800, "label": "2.0 kg (Serves 20-25)"}]'::jsonb,
        true,
        'Rich Chocolate or Butterscotch'
    ),
    (
        'p9999999-9999-9999-9999-999999999999',
        'Butterscotch Crunch Cake',
        'butterscotch-crunch-cake',
        'Golden vanilla sponge layered with rich butterscotch ganache, butter praline crunchies, and topped with caramel drizzle.',
        470,
        'c1111111-1111-1111-1111-111111111111',
        'https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&w=1000&q=80',
        ARRAY['https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&w=1000&q=80'],
        true,
        false,
        true,
        '[{"size": "500g", "price": 470, "label": "0.5 kg (Serves 4-6)"}, {"size": "1kg", "price": 890, "label": "1.0 kg (Serves 8-12)"}, {"size": "1.5kg", "price": 1300, "label": "1.5 kg (Serves 14-18)"}, {"size": "2kg", "price": 1700, "label": "2.0 kg (Serves 20-25)"}]'::jsonb,
        true,
        'Butterscotch Praline'
    )
ON CONFLICT (id) DO NOTHING;

-- 3. SEED REVIEWS (Marked clearly as demo reviews for MVP launch)
INSERT INTO public.reviews (id, customer_name, rating, review, cake_ordered, occasion, approved)
VALUES
    ('r1111111-1111-1111-1111-111111111111', 'Pooja Mehta (Bhayandar East)', 5, 'Ordered the Royal Rasmalai cake for my mothers 50th birthday. It was so fresh, soft, and not overly sweet. Everyone in the family loved it!', 'Royal Rasmalai Fusion Cake', '50th Birthday Celebration', true),
    ('r2222222-2222-2222-2222-222222222222', 'Amit Varma (Navghar Road)', 5, 'The Dutch Chocolate Truffle is hands-down the best chocolate cake in Bhayandar. Quick WhatsApp confirmation and delivered right on time.', 'Dutch Chocolate Truffle Cake', 'Anniversary', true),
    ('r3333333-3333-3333-3333-333333333333', 'Sneha Patil (Golden Nest)', 5, 'Super impressed that their 100% eggless cakes are this moist and delicious. The photo print quality was crystal clear!', 'Custom Edible Photo Birthday Cake', 'Kids Birthday', true),
    ('r4444444-4444-4444-4444-444444444444', 'Rohan Kothari (Jesal Park)', 5, 'Magic Cake Shop saved our celebration with same-day delivery. Very polite team and high hygiene standards.', 'Fresh Fruit Gateau Cake', 'Family Gathering', true)
ON CONFLICT (id) DO NOTHING;
