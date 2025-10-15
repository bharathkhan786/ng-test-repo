import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { CartComponent } from './components/cart/cart.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { Review1Component } from './components/review-1/review-1.component';
import { Review2Component } from './components/review-2/review-2.component';
import { Review3Component } from './components/review-3/review-3.component';

const routes: Routes = [
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'products', component: ProductListComponent },
  { path: 'cart', component: CartComponent },
  { path: 'wishlist', component: WishlistComponent },
  { path: 'reviews/form', component: Review1Component },
  { path: 'reviews/analytics', component: Review2Component },
  { path: 'reviews/moderation', component: Review3Component },
  // { path: 'reviews/search', component: Review4Component },
  // { path: 'reviews/dashboard', component: Review5Component },
  { path: '**', redirectTo: '/products' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }