import React from 'react';
import type { Metadata } from 'next';
import CustomCakeForm from '@/components/custom/CustomCakeForm';

export const metadata: Metadata = {
  title: 'Custom & Designer Cakes | Magic Cake Shop Bhayandar East',
  description:
    'Order custom fondant cakes, 2-tier wedding cakes, photo cakes & kids theme cakes in Bhayandar East. Send your reference photos directly on WhatsApp.',
};

export default function CustomCakesPage() {
  return <CustomCakeForm />;
}
