import { Product } from './product.model';

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
  addedAt: Date;
}

export interface Cart {
  id: string;
  userId: string;
  items: CartItem[];
  totalAmount: number;
  totalItems: number;
  lastUpdated: Date;
}