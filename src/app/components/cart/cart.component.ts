import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Cart } from '../../models/cart-item.model';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html'
})
export class CartComponent implements OnInit {
  cart$: Observable<Cart | null>;

  constructor(private cartService: CartService) {
    this.cart$ = this.cartService.cart$;
  }

  ngOnInit(): void {}

  updateQuantity(productId: string, quantity: number): void {
    this.cartService.updateQuantity(productId, quantity);
  }

  removeItem(productId: string): void {
    this.cartService.removeFromCart(productId);
  }

  clearCart(): void {
    if (confirm('Are you sure you want to clear your cart?')) {
      this.cartService.clearCart();
    }
  }

  getItemTotal(price: number, discountPrice: number | undefined, quantity: number): number {
    const actualPrice = discountPrice || price;
    return actualPrice * quantity;
  }

  proceedToCheckout(): void {
    // Implement checkout logic here
    alert('Checkout functionality would be implemented here');
  }
}