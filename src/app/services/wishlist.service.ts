import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Wishlist, WishlistItem } from '../models/wishlist-item.model';
import { Product } from '../models/product.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private wishlistSubject = new BehaviorSubject<Wishlist | null>(null);
  public wishlist$ = this.wishlistSubject.asObservable();

  constructor(private authService: AuthService) {
    this.loadWishlist();
  }

  private loadWishlist(): void {
    const wishlistData = localStorage.getItem('wishlist');
    if (wishlistData) {
      const wishlist = JSON.parse(wishlistData);
      this.wishlistSubject.next(wishlist);
    } else {
      this.initializeWishlist();
    }
  }

  private initializeWishlist(): void {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      const newWishlist: Wishlist = {
        id: Date.now().toString(),
        userId: currentUser.id,
        items: [],
        totalItems: 0,
        lastUpdated: new Date()
      };
      this.wishlistSubject.next(newWishlist);
      this.saveWishlist(newWishlist);
    }
  }

  private saveWishlist(wishlist: Wishlist): void {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }

  addToWishlist(product: Product, notes?: string): void {
    const currentWishlist = this.wishlistSubject.value || this.createNewWishlist();
    const existingItem = currentWishlist.items.find(item => item.product.id === product.id);

    if (!existingItem) {
      const newWishlistItem: WishlistItem = {
        id: Date.now().toString(),
        product,
        addedAt: new Date(),
        notes
      };
      currentWishlist.items.push(newWishlistItem);
      this.updateWishlistTotals(currentWishlist);
      this.wishlistSubject.next(currentWishlist);
      this.saveWishlist(currentWishlist);
    }
  }

  removeFromWishlist(productId: string): void {
    const currentWishlist = this.wishlistSubject.value;
    if (!currentWishlist) return;

    currentWishlist.items = currentWishlist.items.filter(item => item.product.id !== productId);
    this.updateWishlistTotals(currentWishlist);
    this.wishlistSubject.next(currentWishlist);
    this.saveWishlist(currentWishlist);
  }

  isInWishlist(productId: string): boolean {
    const wishlist = this.wishlistSubject.value;
    return wishlist ? wishlist.items.some(item => item.product.id === productId) : false;
  }

  clearWishlist(): void {
    const currentWishlist = this.wishlistSubject.value;
    if (currentWishlist) {
      currentWishlist.items = [];
      this.updateWishlistTotals(currentWishlist);
      this.wishlistSubject.next(currentWishlist);
      this.saveWishlist(currentWishlist);
    }
  }

  private createNewWishlist(): Wishlist {
    const currentUser = this.authService.getCurrentUser();
    return {
      id: Date.now().toString(),
      userId: currentUser?.id || 'anonymous',
      items: [],
      totalItems: 0,
      lastUpdated: new Date()
    };
  }

  private updateWishlistTotals(wishlist: Wishlist): void {
    wishlist.totalItems = wishlist.items.length;
    wishlist.lastUpdated = new Date();
  }

  getWishlistItemCount(): number {
    const wishlist = this.wishlistSubject.value;
    return wishlist ? wishlist.totalItems : 0;
  }
}