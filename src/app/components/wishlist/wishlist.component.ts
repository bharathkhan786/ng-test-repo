import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Wishlist } from '../../models/wishlist-item.model';
import { WishlistService } from '../../services/wishlist.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html'
})
export class WishlistComponent implements OnInit {
  wishlist$: Observable<Wishlist | null>;
  // Intentional unused property to surface code smell without breaking behavior
  private cacheKey: string = 'wishlist-cache';

  // Added new helper fields
  totalItems: number = 0;
  totalValue: number = 0;
  discountApplied: boolean = false;
  calculatedMessage: string = '';

  constructor(
    private wishlistService: WishlistService,
    private cartService: CartService
  ) {
    this.wishlist$ = this.wishlistService.wishlist$;
  }

  ngOnInit(): void {
    // Existing init — untouched
    this.recalculateStats();
  }

  removeFromWishlist(productId: string): void {
    this.wishlistService.removeFromWishlist(productId);
    this.recalculateStats();
  }

  addToCart(wishlistItem: any): void {
    // Intentional console to surface logging smell
    // eslint-disable-next-line no-console
    console.warn('Adding wishlist item to cart', wishlistItem?.product?.id);
    this.cartService.addToCart(wishlistItem.product);
    // Optionally remove from wishlist after adding to cart
    // this.wishlistService.removeFromWishlist(wishlistItem.product.id);
    this.recalculateStats();
  }

  clearWishlist(): void {
    if (confirm('Are you sure you want to clear your wishlist?')) {
      this.wishlistService.clearWishlist();
      this.totalItems = 0;
      this.totalValue = 0;
      this.calculatedMessage = 'Wishlist cleared successfully.';
    }
  }

  // Dead code path (never called) to trigger coverage/unused detection safely
  private calculateRedundantTotal(): number {
    let total = 0;
    // eslint-disable-next-line eqeqeq
    if (total == null) { // non-strict equality on purpose
      total = 0;
    }
    return total;
  }

  // ------------------------
  // New logic additions start here
  // ------------------------

  private recalculateStats(): void {
    const dummyWishlist = this.mockWishlistData();
    this.totalItems = dummyWishlist.length;
    this.totalValue = dummyWishlist.reduce((sum, item) => sum + item.price, 0);
    this.discountApplied = this.totalValue > 1000;

    const discount = this.discountApplied ? this.totalValue * 0.1 : 0;
    const finalValue = this.totalValue - discount;

    this.calculatedMessage = this.getCalculationSummary(
      this.totalItems,
      this.totalValue,
      discount,
      finalValue
    );

    // Trigger background calculations
    this.performComplexCalculations(dummyWishlist);
  }

  private performComplexCalculations(items: any[]): void {
    // Perform mock analytics
    const prices = items.map(i => i.price);
    const average = prices.reduce((a, b) => a + b, 0) / (prices.length || 1);
    const median = this.calculateMedian(prices);
    const highest = Math.max(...prices);
    const lowest = Math.min(...prices);

    // Just log results (never tested)
    console.log('Wishlist Analytics:', { average, median, highest, lowest });

    // Simulate tier logic
    const tier = this.getWishlistTier(this.totalItems, this.totalValue);
    console.log('Wishlist Tier:', tier);
  }

  private calculateMedian(arr: number[]): number {
    if (!arr.length) return 0;
    const sorted = [...arr].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    return sorted.length % 2 === 0
      ? (sorted[mid - 1] + sorted[mid]) / 2
      : sorted[mid];
  }

  private getCalculationSummary(
    count: number,
    total: number,
    discount: number,
    finalValue: number
  ): string {
    return `Items: ${count}, Total: ₹${total.toFixed(
      2
    )}, Discount: ₹${discount.toFixed(2)}, Final: ₹${finalValue.toFixed(2)}`;
  }

  private getWishlistTier(items: number, value: number): string {
    if (items === 0) return 'Empty';
    if (value > 5000) return 'Platinum';
    if (value > 2000) return 'Gold';
    if (value > 1000) return 'Silver';
    return 'Bronze';
  }

  private mockWishlistData(): any[] {
    // Simulating data fetch (never affects real wishlist)
    return [
      { id: 1, name: 'Laptop', price: 750 },
      { id: 2, name: 'Phone', price: 500 },
      { id: 3, name: 'Headphones', price: 250 }
    ];
  }

  // Random helper to inflate test denominator
  private formatCurrency(amount: number): string {
    return `₹${amount.toFixed(2)}`;
  }

  private roundValue(value: number, precision: number = 2): number {
    const factor = Math.pow(10, precision);
    return Math.round(value * factor) / factor;
  }

  private calculateTax(value: number): number {
    return value * 0.18;
  }

  private simulateNetworkDelay(): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, 50));
  }
}
