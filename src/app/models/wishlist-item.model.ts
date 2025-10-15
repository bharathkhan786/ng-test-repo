import { Product } from './product.model';

export interface WishlistItem {
  id: string;
  product: Product;
  addedAt: Date;
  notes?: string;
}

export interface Wishlist {
  id: string;
  userId: string;
  items: WishlistItem[];
  totalItems: number;
  lastUpdated: Date;
}