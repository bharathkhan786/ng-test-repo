import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cart, CartItem } from '../models/cart-item.model';
import { Product } from '../models/product.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartSubject = new BehaviorSubject<Cart | null>(null);
  public cart$ = this.cartSubject.asObservable();

  constructor(private authService: AuthService) {
    this.loadCart();
  }

  private loadCart(): void {
    const cartData = localStorage.getItem('cart');
    if (cartData) {
      const cart = JSON.parse(cartData);
      this.cartSubject.next(cart);
    } else {
      this.initializeCart();
    }
  }

  private initializeCart(): void {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      const newCart: Cart = {
        id: Date.now().toString(),
        userId: currentUser.id,
        items: [],
        totalAmount: 0,
        totalItems: 0,
        lastUpdated: new Date()
      };
      this.cartSubject.next(newCart);
      this.saveCart(newCart);
    }
  }

  private saveCart(cart: Cart): void {
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  addToCart(product: Product, quantity: number = 1): void {
    const currentCart = this.cartSubject.value || this.createNewCart();
    const existingItemIndex = currentCart.items.findIndex(item => item.product.id === product.id);

    if (existingItemIndex > -1) {
      currentCart.items[existingItemIndex].quantity += quantity;
    } else {
      const newCartItem: CartItem = {
        id: Date.now().toString(),
        product,
        quantity,
        addedAt: new Date()
      };
      currentCart.items.push(newCartItem);
    }

    this.updateCartTotals(currentCart);
    this.cartSubject.next(currentCart);
    this.saveCart(currentCart);
  }

  removeFromCart(productId: string): void {
    const currentCart = this.cartSubject.value;
    if (!currentCart) return;

    currentCart.items = currentCart.items.filter(item => item.product.id !== productId);
    this.updateCartTotals(currentCart);
    this.cartSubject.next(currentCart);
    this.saveCart(currentCart);
  }

  updateQuantity(productId: string, quantity: number): void {
    const currentCart = this.cartSubject.value;
    if (!currentCart) return;

    const item = currentCart.items.find(item => item.product.id === productId);
    if (item) {
      if (quantity <= 0) {
        this.removeFromCart(productId);
      } else {
        item.quantity = quantity;
        this.updateCartTotals(currentCart);
        this.cartSubject.next(currentCart);
        this.saveCart(currentCart);
      }
    }
  }

  clearCart(): void {
    const currentCart = this.cartSubject.value;
    if (currentCart) {
      currentCart.items = [];
      this.updateCartTotals(currentCart);
      this.cartSubject.next(currentCart);
      this.saveCart(currentCart);
    }
  }

  private createNewCart(): Cart {
    const currentUser = this.authService.getCurrentUser();
    return {
      id: Date.now().toString(),
      userId: currentUser?.id || 'anonymous',
      items: [],
      totalAmount: 0,
      totalItems: 0,
      lastUpdated: new Date()
    };
  }

  private updateCartTotals(cart: Cart): void {
    cart.totalItems = cart.items.reduce((total, item) => total + item.quantity, 0);
    cart.totalAmount = cart.items.reduce((total, item) => {
      const price = item.product.discountPrice || item.product.price;
      return total + (price * item.quantity);
    }, 0);
    cart.lastUpdated = new Date();
  }

  getCartItemCount(): number {
    const cart = this.cartSubject.value;
    return cart ? cart.totalItems : 0;
  }
}