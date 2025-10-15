import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Core Components
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { CartComponent } from './components/cart/cart.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';

// Review Components (for analysis)
import { Review1Component } from './components/review-1/review-1.component';
import { Review2Component } from './components/review-2/review-2.component';
import { Review3Component } from './components/review-3/review-3.component';

// Services
import { AuthService } from './services/auth.service';
import { ProductService } from './services/product.service';
import { CartService } from './services/cart.service';
import { WishlistService } from './services/wishlist.service';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SettingsComponent } from './components/settings/settings.component';
import { OrdersComponent } from './components/orders/orders.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    ProductListComponent,
    CartComponent,
    WishlistComponent,
    Review1Component,
    Review2Component,
    Review3Component,
    AboutComponent,
    ContactComponent,
    ProfileComponent,
    SettingsComponent,
    OrdersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    AuthService,
    ProductService,
    CartService,
    WishlistService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }