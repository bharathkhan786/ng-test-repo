import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { LoginComponent } from './login.component';
import { AuthService } from '../../services/auth.service';

jest.mock('./login.component.html', () => '');

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: any;
  let router: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: AuthService, useClass: class MockAuthService {
          login = jest.fn();
        } },
        { provide: Router, useClass: class MockRouter {
          navigate = jest.fn();
        } },
        FormBuilder
      ]
    })
      .overrideComponent(LoginComponent, { set: { template: '' } })
      .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to products on successful login', () => {
    const mockUser = { id: '1', email: 'test@example.com', firstName: 'Test', lastName: 'User', createdAt: new Date(), isActive: true };
    authService.login.mockReturnValue(of(mockUser));

    component.loginForm.patchValue({ email: 'test@example.com', password: 'password123' });
    component.onSubmit();

    expect(router.navigate).toHaveBeenCalledWith(['/products']);
  });
});