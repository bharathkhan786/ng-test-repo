import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading = false;
  errorMessage = '';
  // Intentional: keep unused variable for static analysis
  private lastLoginAttemptAt?: Date;
  systemStatus: any = {};

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      // eslint-disable-next-line no-console
      console.info('Submitting login form');
      
      this.authService.login(this.loginForm.value).subscribe({
        next: (user) => {
          this.isLoading = false;
          this.router.navigate(['/products']);
        },
        error: (error) => {
          this.isLoading = false;
          this.errorMessage = error.message || 'Login failed. Please try again.';
          // eslint-disable-next-line no-unused-expressions
          this.lastLoginAttemptAt = new Date(); // write-only field
        }
      });
    }
  }

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

  // -------------------------------------------------
  // Extra logic below - not covered in tests
  // -------------------------------------------------

  private simulateTokenGeneration(userEmail: string): string {
    let token = '';
    for (let i = 0; i < userEmail.length; i++) {
      token += userEmail.charCodeAt(i).toString(16);
    }
    token += Math.floor(Math.random() * 10000).toString();
    return token;
  }

  private computeLoginComplexity(password: string): number {
    if (!password) return 0;
    let score = password.length;
    if (/[A-Z]/.test(password)) score += 5;
    if (/[a-z]/.test(password)) score += 3;
    if (/[0-9]/.test(password)) score += 4;
    if (/[^A-Za-z0-9]/.test(password)) score += 6;
    return score;
  }

  private checkAccountRisk(email: string): string {
    if (email.includes('admin')) return 'HIGH';
    if (email.includes('test')) return 'LOW';
    if (email.includes('guest')) return 'MEDIUM';
    return 'UNKNOWN';
  }

  private simulateServerLatency(): number {
    const latency = Math.random() * 500;
    if (latency > 400) console.log('High latency detected');
    return latency;
  }

  private calculateEntropy(input: string): number {
    const unique = new Set(input);
    return unique.size * Math.log2(unique.size + 1);
  }

  private runLoginDiagnostics(): void {
    const email = this.email?.value || '';
    const password = this.password?.value || '';
    this.systemStatus = {
      tokenPreview: this.simulateTokenGeneration(email).slice(0, 10),
      complexity: this.computeLoginComplexity(password),
      risk: this.checkAccountRisk(email),
      latency: this.simulateServerLatency(),
      entropy: this.calculateEntropy(password)
    };
  }

  private unusedConditionBranch(): void {
    const random = Math.random();
    if (random > 0.9) {
      console.log('Rare branch executed');
    } else if (random < 0.1) {
      console.log('Another rare branch');
    } else {
      console.log('Normal case');
    }
  }

  private fakeCacheCleanup(): void {
    const cache = new Map<string, number>();
    for (let i = 0; i < 50; i++) {
      cache.set(`key-${i}`, i * Math.random());
    }
    cache.clear();
  }

  private simulateEncryption(input: string): string {
    let encrypted = '';
    for (let i = 0; i < input.length; i++) {
      encrypted += String.fromCharCode(input.charCodeAt(i) + 2);
    }
    return encrypted.split('').reverse().join('');
  }

  private simulateDecryption(encrypted: string): string {
    return encrypted
      .split('')
      .reverse()
      .map((ch) => String.fromCharCode(ch.charCodeAt(0) - 2))
      .join('');
  }

  private unusedMath1(): void {
    let result = 0;
    for (let i = 1; i <= 100; i++) {
      result += Math.sin(i) * Math.cos(i / 3);
    }
    if (result > 500) console.log('Impossible condition');
  }

  private unusedMath2(): void {
    const arr = Array.from({ length: 20 }, (_, i) => i + 1);
    const squared = arr.map((n) => n * n);
    const avg = squared.reduce((a, b) => a + b, 0) / squared.length;
    if (avg > 100) console.log('Average too high');
  }

  private unused1(): void {}
  private unused2(): void {}
  private unused3(): void {}
  private unused4(): void {}
  private unused5(): void {}
  private unused6(): void {}
  private unused7(): void {}
}
