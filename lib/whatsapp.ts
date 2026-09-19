import { Order, OrderInput } from '@/types/order';

const DEFAULT_PHONE = '919876543210';

export function getShopWhatsAppNumber(): string {
  const envNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  if (!envNumber) return DEFAULT_PHONE;
  // Strip any non-digit characters (+, spaces, dashes)
  return envNumber.replace(/\D/g, '');
}

export function getShopPhoneNumber(): string {
  return process.env.NEXT_PUBLIC_SHOP_PHONE || '+91 98765 43210';
}

/**
 * Builds the WhatsApp pre-filled URL for an order enquiry
 */
export function generateOrderWhatsAppUrl(order: Partial<Order> | OrderInput, orderNumber?: string): string {
  const phone = getShopWhatsAppNumber();
  
  const lines: string[] = [
    `Hi Magic Cake Shop, I would like to order:`
  ];

  if (orderNumber) {
    lines.push(`Order Ref: #${orderNumber}`);
  }

  lines.push(`Cake: ${order.product_name || 'Custom Cake'}`);
  lines.push(`Quantity: ${order.quantity || 1}`);
  lines.push(`Size: ${order.size || '1 kg'}`);
  lines.push(`Fulfilment: ${order.fulfilment_type === 'delivery' ? 'Home Delivery' : 'Store Pickup'}`);
  lines.push(`Date: ${order.preferred_date || 'As soon as possible'}`);
  lines.push(`Time: ${order.preferred_time || 'Standard'}`);

  if (order.fulfilment_type === 'delivery') {
    const addressDetails = [order.delivery_address, order.delivery_area, order.pincode]
      .filter(Boolean)
      .join(', ');
    lines.push(`Delivery Address: ${addressDetails || 'Bhayandar East'}`);
  }

  if (order.cake_message && order.cake_message.trim()) {
    lines.push(`Message on Cake: "${order.cake_message.trim()}"`);
  }

  if (order.special_instructions && order.special_instructions.trim()) {
    lines.push(`Special Instructions: ${order.special_instructions.trim()}`);
  }

  if (order.customer_name) {
    lines.push(`Customer: ${order.customer_name} (${order.phone || ''})`);
  }

  lines.push('');
  lines.push(`Please confirm availability and final price.`);

  const message = lines.join('\n');
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

/**
 * Builds a direct inquiry URL for a specific product
 */
export function generateProductInquiryUrl(productName: string, size: string = '500g'): string {
  const phone = getShopWhatsAppNumber();
  const message = `Hi Magic Cake Shop, I'm interested in ordering the "${productName}" (${size}). Could you please share availability and delivery details for Bhayandar?`;
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

/**
 * Builds a general inquiry URL
 */
export function generateGeneralWhatsAppUrl(customText?: string): string {
  const phone = getShopWhatsAppNumber();
  const text = customText || 'Hi Magic Cake Shop, I would like to know more about your freshly baked cakes and custom ordering.';
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}

/**
 * Builds custom cake enquiry WhatsApp message
 */
export function generateCustomCakeWhatsAppUrl(details: {
  name: string;
  phone: string;
  themeOrOccasion: string;
  approxWeight: string;
  preferredDate: string;
  deliveryArea: string;
  flavor?: string;
  description?: string;
}): string {
  const phone = getShopWhatsAppNumber();
  const lines = [
    `Hi Magic Cake Shop, I would like to request a Custom Cake design:`,
    `Customer Name: ${details.name}`,
    `Phone: ${details.phone}`,
    `Occasion/Theme: ${details.themeOrOccasion}`,
    `Approximate Weight: ${details.approxWeight}`,
    `Preferred Flavor: ${details.flavor || 'Baker Choice / Open'}`,
    `Date Needed: ${details.preferredDate}`,
    `Fulfilment/Area: ${details.deliveryArea || 'Bhayandar East'}`,
  ];

  if (details.description) {
    lines.push(`Design Details: ${details.description}`);
  }

  lines.push('');
  lines.push(`I would love to discuss design options, reference photos, and pricing. Please guide me!`);

  const message = lines.join('\n');
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
