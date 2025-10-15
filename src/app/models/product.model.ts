export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  discountPrice?: number;
  imageUrl: string;
  category: string;
  inStock: boolean;
  rating: number;
  reviewCount: number;
  tags: string[];
  createdAt: Date;
}

export interface ProductFilter {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  searchTerm?: string;
}