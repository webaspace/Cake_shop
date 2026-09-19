import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import ProductDetailView from '@/components/cakes/ProductDetailView';
import { getProductBySlug, getProducts } from '@/lib/data-service';
import { ProductJsonLd, BreadcrumbJsonLd } from '@/components/seo/JsonLd';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: 'Cake Not Found | Magic Cake Shop',
    };
  }

  return {
    title: `${product.name} | Order Online in Bhayandar East`,
    description: `${product.description} Available in multiple sizes. 100% Eggless options with same-day home delivery in Bhayandar.`,
    openGraph: {
      title: `${product.name} — Magic Cake Shop Bhayandar East`,
      description: product.description,
      images: [
        {
          url: product.image_url,
          width: 800,
          height: 600,
          alt: product.name,
        },
      ],
    },
  };
}

export const revalidate = 60;

export default async function CakeDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  // Related products from same category or general list
  const allProducts = await getProducts();
  const relatedProducts = allProducts.filter(
    (p) => p.id !== product.id && (p.category_id === product.category_id || p.featured)
  );

  const breadcrumbs = [
    { name: 'Home', url: 'https://magiccakeshop.in' },
    { name: 'Cakes', url: 'https://magiccakeshop.in/cakes' },
    { name: product.name, url: `https://magiccakeshop.in/cakes/${product.slug}` },
  ];

  return (
    <>
      <ProductJsonLd product={product} />
      <BreadcrumbJsonLd items={breadcrumbs} />
      <ProductDetailView product={product} relatedProducts={relatedProducts} />
    </>
  );
}
