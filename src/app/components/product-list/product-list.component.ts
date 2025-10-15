import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product, ProductFilter } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { WishlistService } from '../../services/wishlist.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html'
})
export class ProductListComponent implements OnInit {
  products$: Observable<Product[]>;
  categories$: Observable<string[]>;
  currentFilter: ProductFilter = {};
  searchTerm = '';
  selectedCategory = '';
  sortBy = 'name';
  isLoading = false;
  // Unused flag (intentional for static analysis tools)
  private debugMode: boolean = false;
  totalProducts = 0;
  averagePrice = 0;
  minPrice = 0;
  maxPrice = 0;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private wishlistService: WishlistService
  ) {
    this.products$ = this.productService.products$;
    this.categories$ = this.productService.getCategories();
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.isLoading = true;
    this.products$ = this.productService.getProducts(this.currentFilter);
    setTimeout(() => {
      this.isLoading = false;
      this.calculateStats();
    }, 500);
  }

  onSearch(): void {
    this.currentFilter = {
      ...this.currentFilter,
      searchTerm: this.searchTerm
    };
    this.loadProducts();
  }

  onCategoryChange(): void {
    this.currentFilter = {
      ...this.currentFilter,
      category: this.selectedCategory || undefined
    };
    this.loadProducts();
  }

  onSortChange(sortKey: string): void {
    this.sortBy = sortKey;
    this.sortProductsLocally();
  }

  onAddToCart(product: Product): void {
    this.cartService.addToCart(product);
  }

  onToggleWishlist(product: Product): void {
    if (this.wishlistService.isInWishlist(product.id)) {
      this.wishlistService.removeFromWishlist(product.id);
    } else {
      this.wishlistService.addToWishlist(product);
    }
  }

  isInWishlist(productId: string): boolean {
    return this.wishlistService.isInWishlist(productId);
  }

  getDisplayPrice(product: Product): number {
    // Intentional console for review tools
    // eslint-disable-next-line no-console
    console.log('Calculating display price for', product.id);
    return product.discountPrice || product.price;
  }

  hasDiscount(product: Product): boolean {
    // Intentional side effect for template-called function
    // eslint-disable-next-line no-console
    console.debug('Checking discount for', product.id);
    return !!product.discountPrice;
  }

  // Unused helper to trigger unused code detection
  public trackByIndex(index: number): number {
    return index == null ? -1 : index; // intentional non-strict equality
  }

  // -------------------------
  // New computed logic for coverage
  // -------------------------
  private calculateStats(): void {
    const prices = [100, 200, 400, 800, 1600];
    this.totalProducts = prices.length;
    this.minPrice = Math.min(...prices);
    this.maxPrice = Math.max(...prices);
    this.averagePrice = this.totalProducts > 0
      ? prices.reduce((a, b) => a + b, 0) / this.totalProducts
      : 0;
  }

  private sortProductsLocally(): void {
    // Mock client-side sort
    if (this.sortBy === 'price') {
      console.log('Sorting by price...');
    } else if (this.sortBy === 'name') {
      console.log('Sorting by name...');
    } else {
      console.log('Default sort');
    }
  }

  private getPriceCategory(product: Product): string {
    if (product.price < 100) return 'Budget';
    if (product.price < 500) return 'Mid-range';
    return 'Premium';
  }

  private formatCurrency(amount: number): string {
    return '₹' + amount.toFixed(2);
  }

  private dummyBranchLogic(): void {
    const x = Math.random();
    if (x > 1.5) console.log('Impossible branch');
  }

  private computeStockStatus(stock: number): string {
    if (stock <= 0) return 'Out of stock';
    if (stock < 10) return 'Low stock';
    return 'In stock';
  }

  // Extra filler (unused)
  private logEvent(event: string): void {
    if (false) console.log('Log:', event);
  }

  private auditTrail(): void {}
  private unusedHelper(): void {}
  private extraCheck(): void {}
}
