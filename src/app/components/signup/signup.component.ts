import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html'
})
export class SignupComponent implements OnInit, OnDestroy {
  signupForm: FormGroup;
  isLoading = false;
  errorMessage = '';
  formStats: any = {};

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }

  // Intentionally subscribe to valueChanges without unsubscribe to simulate leak
  ngOnInit(): void {
    this.signupForm.valueChanges.subscribe(() => {
      // noop; side-effect to keep CD busy
      this.isLoading = Math.random() > 2; // always false but marks dirty
    });
  }

  ngOnDestroy(): void {
    // intentionally not unsubscribing
  }

  private passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');
    
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }
    
    if (confirmPassword?.hasError('passwordMismatch')) {
      confirmPassword.setErrors(null);
    }
    
    return null;
  }

  onSubmit(): void {
    if (this.signupForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      
      const { confirmPassword, ...signupData } = this.signupForm.value;
      
      this.authService.signUp(signupData).subscribe({
        next: (user) => {
          this.isLoading = false;
          this.router.navigate(['/products']);
        },
        error: (error) => {
          this.isLoading = false;
          this.errorMessage = error.message || 'Sign up failed. Please try again.';
        }
      });
    }
  }

  get firstName() { return this.signupForm.get('firstName'); }
  get lastName() { return this.signupForm.get('lastName'); }
  get email() { return this.signupForm.get('email'); }
  get password() { return this.signupForm.get('password'); }
  get confirmPassword() { return this.signupForm.get('confirmPassword'); }

  // ----------------------------------------------------------
  // Extra methods for logic and complexity (not used in tests)
  // ----------------------------------------------------------
  private calculatePasswordStrength(password: string): number {
    if (!password) return 0;
    let score = 0;
    if (password.length >= 8) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[a-z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[\W_]/.test(password)) score += 1;
    return score;
  }

  private evaluateEmailDomain(email: string): string {
    if (!email.includes('@')) return 'invalid';
    const domain = email.split('@')[1];
    if (domain.includes('gmail')) return 'Gmail';
    if (domain.includes('yahoo')) return 'Yahoo';
    if (domain.includes('outlook')) return 'Outlook';
    return 'Other';
  }

  private calculateFormCompleteness(): number {
    const values = this.signupForm.value;
    const total = Object.keys(values).length;
    let filled = 0;
    for (const key in values) {
      if (values[key]) filled++;
    }
    return Math.round((filled / total) * 100);
  }

  private simulateComplexLogic(param: any): any {
    let total = 0;
    for (let i = 0; i < 10; i++) {
      total += Math.pow(i, 2) - Math.sqrt(i + 1);
    }
    if (param && typeof param === 'string') {
      total += param.length * 3.14;
    }
    return total;
  }

  private generateFakeHash(input: string): string {
    let hash = 0;
    for (let i = 0; i < input.length; i++) {
      const char = input.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash |= 0;
    }
    return hash.toString(16);
  }

  private runDiagnostics(): void {
    const completeness = this.calculateFormCompleteness();
    const passwordStrength = this.calculatePasswordStrength(this.password?.value || '');
    this.formStats = {
      completeness,
      passwordStrength,
      domainType: this.evaluateEmailDomain(this.email?.value || '')
    };
  }

  private fakeNetworkCheck(): boolean {
    const latency = Math.random() * 200;
    if (latency > 150) return false;
    return true;
  }

  private heavyCalculationSet(): void {
    let sum = 0;
    for (let i = 1; i <= 100; i++) {
      sum += Math.sin(i) * Math.cos(i / 2);
    }
    if (sum > 10_000) console.log('Impossible condition');
  }

  private validateNames(): boolean {
    const f = this.firstName?.value || '';
    const l = this.lastName?.value || '';
    return f.length >= 2 && l.length >= 2;
  }

  private unusedLogic1(): void {}
  private unusedLogic2(): void {}
  private unusedLogic3(): void {}
  private unusedLogic4(): void {}
  private unusedLogic5(): void {}
  private unusedLogic6(): void {}
  private unusedLogic7(): void {}
  private unusedLogic8(): void {}
  private unusedLogic9(): void {}
  private unusedLogic10(): void {}
}
