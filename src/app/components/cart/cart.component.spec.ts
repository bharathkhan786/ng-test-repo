import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let cartService: any;

  beforeEach(async () => {
    const cartSpy = {
      updateQuantity: jest.fn(),
      removeFromCart: jest.fn(),
      clearCart: jest.fn(),
      cart$: of({ items: [], totalItems: 0, totalAmount: 0, id: '', userId: '', lastUpdated: new Date() }),
      addToCart: jest.fn(),
      getCartItemCount: jest.fn().mockReturnValue(0)
    };
    const authService = { getCurrentUser: jest.fn().mockReturnValue({ id: '1' }) };

    await TestBed.configureTestingModule({
      declarations: [CartComponent],
      imports: [RouterTestingModule],
      providers: [
        { provide: CartService, useClass: class MockCartService {
          updateQuantity = jest.fn();
          removeFromCart = jest.fn();
          clearCart = jest.fn();
          cart$ = of({ items: [], totalItems: 0, totalAmount: 0, id: '', userId: '', lastUpdated: new Date() });
          addToCart = jest.fn();
          getCartItemCount = jest.fn().mockReturnValue(0);
        } },
        { provide: AuthService, useClass: class MockAuthService {
          getCurrentUser = jest.fn().mockReturnValue({ id: '1' });
        } }
      ]
    })
      .overrideComponent(CartComponent, { set: { template: '' } })
      .compileComponents();

    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    cartService = TestBed.inject(CartService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call cartService.updateQuantity when updating quantity', () => {
    component.updateQuantity('1', 2);
    expect(cartService.updateQuantity).toHaveBeenCalledWith('1', 2);
  });
});