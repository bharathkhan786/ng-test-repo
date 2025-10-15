import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { ProductListComponent } from './product-list.component';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { WishlistService } from '../../services/wishlist.service';
import { AuthService } from '../../services/auth.service';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let productService: jest.Mocked<ProductService>;
  let cartService: jest.Mocked<CartService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductListComponent],
      imports: [FormsModule],
      providers: [
        { provide: ProductService, useClass: class MockProductService {
          getProducts = jest.fn().mockReturnValue(of([]));
          getCategories = jest.fn().mockReturnValue(of([]));
          products$ = of([]);
          getProductById = jest.fn().mockReturnValue(of(undefined));
        } },
        { provide: CartService, useClass: class MockCartService {
          addToCart = jest.fn();
          cart$ = of({ items: [], totalItems: 0, totalAmount: 0, id: '', userId: '', lastUpdated: new Date() });
          updateQuantity = jest.fn();
          removeFromCart = jest.fn();
          clearCart = jest.fn();
          getCartItemCount = jest.fn().mockReturnValue(0);
        } },
        { provide: WishlistService, useClass: class MockWishlistService {
          isInWishlist = jest.fn();
          addToWishlist = jest.fn();
          removeFromWishlist = jest.fn();
          clearWishlist = jest.fn();
          wishlist$ = of({ items: [], totalItems: 0, id: '', userId: '', lastUpdated: new Date() });
          getWishlistItemCount = jest.fn().mockReturnValue(0);
        } },
        { provide: AuthService, useClass: class MockAuthService {
          getCurrentUser = jest.fn().mockReturnValue({ id: '1' });
        } }
      ]
    })
      .overrideComponent(ProductListComponent, { set: { template: '' } })
      .compileComponents();

    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load products on init', () => {
    expect(productService.getProducts).toHaveBeenCalled();
  });
});