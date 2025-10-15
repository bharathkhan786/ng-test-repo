import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { SignupComponent } from './signup.component';
import { AuthService } from '../../services/auth.service';

jest.mock('./signup.component.html', () => '');

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let authService: any;
  let router: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignupComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: AuthService, useClass: class MockAuthService {
          signUp = jest.fn();
        } },
        { provide: Router, useClass: class MockRouter {
          navigate = jest.fn();
        } },
        FormBuilder
      ]
    })
      .overrideComponent(SignupComponent, { set: { template: '' } })
      .compileComponents();

    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should validate password matching', () => {
    component.signupForm.patchValue({
      firstName: 'Test',
      lastName: 'User',
      email: 'test@example.com',
      password: 'password123',
      confirmPassword: 'different'
    });

    expect(component.signupForm.hasError('passwordMismatch')).toBeTruthy();
  });
});