import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { Product, ProductFilter } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsSubject = new BehaviorSubject<Product[]>([]);
  public products$ = this.productsSubject.asObservable();

  private mockProducts: Product[] = [
    {
      id: '1',
      name: 'Wireless Headphones',
      description: 'High-quality wireless headphones with noise cancellation',
      price: 199.99,
      discountPrice: 149.99,
      imageUrl: 'https://via.placeholder.com/300x300?text=Headphones',
      category: 'Electronics',
      inStock: true,
      rating: 4.5,
      reviewCount: 128,
      tags: ['wireless', 'audio', 'bluetooth'],
      createdAt: new Date('2024-01-15')
    },
    {
      id: '2',
      name: 'Smart Watch',
      description: 'Feature-rich smartwatch with fitness tracking',
      price: 299.99,
      imageUrl: 'https://via.placeholder.com/300x300?text=SmartWatch',
      category: 'Electronics',
      inStock: true,
      rating: 4.2,
      reviewCount: 89,
      tags: ['smartwatch', 'fitness', 'health'],
      createdAt: new Date('2024-02-01')
    },
    {
      id: '3',
      name: 'Running Shoes',
      description: 'Comfortable running shoes for daily workouts',
      price: 89.99,
      discountPrice: 69.99,
      imageUrl: 'https://via.placeholder.com/300x300?text=Shoes',
      category: 'Sports',
      inStock: false,
      rating: 4.7,
      reviewCount: 256,
      tags: ['shoes', 'running', 'sports'],
      createdAt: new Date('2024-01-20')
    },
    {
      id: '4',
      name: 'Coffee Maker',
      description: 'Automatic coffee maker with programmable settings',
      price: 129.99,
      imageUrl: 'https://via.placeholder.com/300x300?text=Coffee',
      category: 'Home',
      inStock: true,
      rating: 4.3,
      reviewCount: 67,
      tags: ['coffee', 'kitchen', 'appliance'],
      createdAt: new Date('2024-02-10')
    }
  ];

  constructor() {
    this.productsSubject.next(this.mockProducts);
  }

  getProducts(filter?: ProductFilter): Observable<Product[]> {
    return of(this.mockProducts).pipe(
      delay(500),
      map(products => {
        let filteredProducts = [...products];

        if (filter) {
          if (filter.category) {
            filteredProducts = filteredProducts.filter(p => 
              p.category.toLowerCase().includes(filter.category!.toLowerCase())
            );
          }
          if (filter.minPrice !== undefined) {
            filteredProducts = filteredProducts.filter(p => p.price >= filter.minPrice!);
          }
          if (filter.maxPrice !== undefined) {
            filteredProducts = filteredProducts.filter(p => p.price <= filter.maxPrice!);
          }
          if (filter.inStock !== undefined) {
            filteredProducts = filteredProducts.filter(p => p.inStock === filter.inStock);
          }
          if (filter.searchTerm) {
            const searchTerm = filter.searchTerm.toLowerCase();
            filteredProducts = filteredProducts.filter(p => 
              p.name.toLowerCase().includes(searchTerm) ||
              p.description.toLowerCase().includes(searchTerm) ||
              p.tags.some(tag => tag.toLowerCase().includes(searchTerm))
            );
          }
        }

        return filteredProducts;
      })
    );
  }

  getProductById(id: string): Observable<Product | undefined> {
    return of(this.mockProducts.find(p => p.id === id)).pipe(delay(300));
  }

  getCategories(): Observable<string[]> {
    const categories = [...new Set(this.mockProducts.map(p => p.category))];
    return of(categories);
  }
}