export interface Review {
  id: string;
  customer_name: string;
  rating: number;
  review: string;
  cake_ordered?: string;
  occasion?: string;
  approved: boolean;
  created_at: string;
}

export interface ReviewInput {
  customer_name: string;
  rating: number;
  review: string;
  cake_ordered?: string;
  occasion?: string;
}
