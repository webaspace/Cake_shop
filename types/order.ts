export type OrderStatus =
  | 'pending'
  | 'contacted'
  | 'confirmed'
  | 'preparing'
  | 'ready'
  | 'completed'
  | 'cancelled';

export type FulfilmentType = 'delivery' | 'pickup';

export interface Order {
  id: string;
  order_number: string;
  customer_name: string;
  phone: string;
  whatsapp: string;
  email?: string;
  product_id?: string;
  product_name: string;
  quantity: number;
  size: string;
  unit_price: number;
  total_estimated_price: number;
  cake_message?: string;
  special_instructions?: string;
  fulfilment_type: FulfilmentType;
  delivery_address?: string;
  delivery_area?: string;
  pincode?: string;
  preferred_date: string;
  preferred_time: string;
  status: OrderStatus;
  delivery_charges_confirmed?: number;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface OrderInput {
  customer_name: string;
  phone: string;
  whatsapp: string;
  email?: string;
  product_id?: string;
  product_name: string;
  quantity: number;
  size: string;
  unit_price: number;
  total_estimated_price: number;
  cake_message?: string;
  special_instructions?: string;
  fulfilment_type: FulfilmentType;
  delivery_address?: string;
  delivery_area?: string;
  pincode?: string;
  preferred_date: string;
  preferred_time: string;
}
