import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { WishlistComponent } from './wishlist.component';
import { WishlistService } from '../../services/wishlist.service';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';

describe('WishlistComponent', () => {
  let component: WishlistComponent;
  let fixture: ComponentFixture<WishlistComponent>;
  let wishlistService: jest.Mocked<WishlistService>;
  let cartService: jest.Mocked<CartService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WishlistComponent],
      imports: [RouterTestingModule],
      providers: [
        { provide: WishlistService, useClass: class MockWishlistService {
          wishlist$ = of({ items: [], totalItems: 0, id: '', userId: '', lastUpdated: new Date() });
          removeFromWishlist = jest.fn();
          clearWishlist = jest.fn();
          addToWishlist = jest.fn();
          isInWishlist = jest.fn();
          getWishlistItemCount = jest.fn().mockReturnValue(0);
        } },
        { provide: CartService, useClass: class MockCartService {
          addToCart = jest.fn();
        } },
        { provide: AuthService, useClass: class MockAuthService {
          getCurrentUser = jest.fn().mockReturnValue({ id: '1' });
        } }
      ]
    })
      .overrideComponent(WishlistComponent, { set: { template: '' } })
      .compileComponents();

    fixture = TestBed.createComponent(WishlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call wishlistService.removeFromWishlist when removing item', () => {
    component.removeFromWishlist('1');
    expect(wishlistService.removeFromWishlist).toHaveBeenCalledWith('1');
  });
});