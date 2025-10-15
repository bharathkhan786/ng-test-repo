import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { User, LoginRequest, SignUpRequest } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  // Mock users database
  private users: User[] = [
    {
      id: '1',
      email: 'user@example.com',
      firstName: 'John',
      lastName: 'Doe',
      createdAt: new Date(),
      isActive: true
    }
  ];

  constructor() {
    this.checkAuthStatus();
  }

  private checkAuthStatus(): void {
    const userData = localStorage.getItem('currentUser');
    if (userData) {
      const user = JSON.parse(userData);
      this.currentUserSubject.next(user);
      this.isAuthenticatedSubject.next(true);
    }
  }

  login(credentials: LoginRequest): Observable<User> {
    return of(null).pipe(
      delay(1000),
      map(() => {
        const user = this.users.find(u => u.email === credentials.email);
        if (user && credentials.password === 'password123') {
          localStorage.setItem('currentUser', JSON.stringify(user));
          localStorage.setItem('authToken', 'mock-jwt-token');
          this.currentUserSubject.next(user);
          this.isAuthenticatedSubject.next(true);
          return user;
        } else {
          throw new Error('Invalid credentials');
        }
      })
    );
  }

  signUp(userData: SignUpRequest): Observable<User> {
    return of(null).pipe(
      delay(1000),
      map(() => {
        const existingUser = this.users.find(u => u.email === userData.email);
        if (existingUser) {
          throw new Error('User already exists');
        }

        const newUser: User = {
          id: Date.now().toString(),
          email: userData.email,
          firstName: userData.firstName,
          lastName: userData.lastName,
          createdAt: new Date(),
          isActive: true
        };

        this.users.push(newUser);
        localStorage.setItem('currentUser', JSON.stringify(newUser));
        localStorage.setItem('authToken', 'mock-jwt-token');
        this.currentUserSubject.next(newUser);
        this.isAuthenticatedSubject.next(true);
        return newUser;
      })
    );
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('authToken');
    this.currentUserSubject.next(null);
    this.isAuthenticatedSubject.next(false);
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }
}