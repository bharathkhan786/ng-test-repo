import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { AppComponent } from './app.component';
import { AuthService } from './services/auth.service';
import { CartService } from './services/cart.service';
import { WishlistService } from './services/wishlist.service';

jest.mock('./app.component.html', () => ''); // Mocking the HTML template

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent],
      providers: [
        { provide: AuthService, useClass: class MockAuthService {
          logout = jest.fn();
          currentUser$ = of(null);
          isAuthenticated$ = of(false);
        } },
        { provide: CartService, useClass: class MockCartService {
          cart$ = of(null);
        } },
        { provide: WishlistService, useClass: class MockWishlistService {
          wishlist$ = of(null);
        } }
      ]
    })
      .overrideComponent(AppComponent, { set: { template: '', styles: [''] } }) // Override template and styles
      .compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'ecommerce-app'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('ecommerce-app');
  });
});