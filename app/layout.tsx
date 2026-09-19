import type { Metadata, Viewport } from 'next';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import MobileBottomBar from '@/components/layout/MobileBottomBar';
import { LocalBusinessJsonLd } from '@/components/seo/JsonLd';

export const viewport: Viewport = {
  themeColor: '#3E2313',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: 'Magic Cake Shop | Best Bakery in Bhayandar East, Maharashtra',
    template: '%s | Magic Cake Shop Bhayandar',
  },
  description:
    'Order fresh, 100% eggless & custom cakes in Bhayandar East. Birthday cakes, chocolate truffle, photo cakes, anniversary & custom fondant cakes with same-day delivery.',
  keywords: [
    'Cake shop in Bhayandar',
    'Cakes in Bhayandar East',
    'Birthday cakes Bhayandar',
    'Custom cakes Bhayandar',
    'Cake delivery Bhayandar',
    'Eggless cakes Bhayandar',
    'Photo cakes Bhayandar',
    'Bakery in Navghar Road',
    'Magic Cake Shop',
  ],
  authors: [{ name: 'Magic Cake Shop' }],
  creator: 'Magic Cake Shop Bhayandar East',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://magiccakeshop.in',
    siteName: 'Magic Cake Shop',
    title: 'Magic Cake Shop — Fresh Handcrafted Cakes in Bhayandar East',
    description:
      'Delicious birthday, anniversary, and customized cakes in Bhayandar East. Pure eggless options, same-day delivery & easy WhatsApp ordering.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'Magic Cake Shop Bhayandar East - Fresh Cakes',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <head>
        <LocalBusinessJsonLd />
      </head>
      <body className="min-h-full flex flex-col bg-[#FDFBF7] text-[#1F2937] antialiased">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
        <MobileBottomBar />
      </body>
    </html>
  );
}

