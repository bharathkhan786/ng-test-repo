import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';
import { CartService } from './services/cart.service';
import { WishlistService } from './services/wishlist.service';
import { User } from './models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ecommerce-app';
  currentUser$: Observable<User | null>;
  isAuthenticated$: Observable<boolean>;
  cartItemCount = 0;
  wishlistItemCount = 0;

  constructor(
    private authService: AuthService,
    private cartService: CartService,
    private wishlistService: WishlistService,
    private router: Router
  ) {
    this.currentUser$ = this.authService.currentUser$;
    this.isAuthenticated$ = this.authService.isAuthenticated$;
  }

  ngOnInit(): void {
    // Subscribe to cart and wishlist changes
    this.cartService.cart$.subscribe(cart => {
      this.cartItemCount = cart ? cart.totalItems : 0;
    });

    this.wishlistService.wishlist$.subscribe(wishlist => {
      this.wishlistItemCount = wishlist ? wishlist.totalItems : 0;
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  navigateToCart(): void {
    this.router.navigate(['/cart']);
  }

  navigateToWishlist(): void {
    this.router.navigate(['/wishlist']);
  }
}