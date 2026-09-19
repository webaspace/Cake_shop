import React from 'react';
import { Product } from '@/types/product';

export function LocalBusinessJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Bakery',
    name: 'Magic Cake Shop',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1200&q=80',
    '@id': 'https://magiccakeshop.in',
    url: 'https://magiccakeshop.in',
    telephone: '+919876543210',
    priceRange: '₹₹',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Bhanu Park CHS, Navghar Road',
      addressLocality: 'Bhayandar East',
      addressRegion: 'Maharashtra',
      postalCode: '401105',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 19.3039,
      longitude: 72.8544,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        opens: '09:00',
        closes: '23:30',
      },
    ],
    servesCuisine: ['Bakery', 'Cakes', 'Desserts', 'Eggless Bakery'],
    paymentAccepted: 'Cash, UPI, PhonePe, Google Pay, Paytm',
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ProductJsonLd({ product }: { product: Product }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: [product.image_url, ...(product.gallery || [])],
    description: product.description,
    sku: product.slug,
    brand: {
      '@type': 'Brand',
      name: 'Magic Cake Shop',
    },
    offers: {
      '@type': 'Offer',
      url: `https://magiccakeshop.in/cakes/${product.slug}`,
      priceCurrency: 'INR',
      price: product.price,
      availability: product.available ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      itemCondition: 'https://schema.org/NewCondition',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function BreadcrumbJsonLd({ items }: { items: { name: string; url: string }[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
