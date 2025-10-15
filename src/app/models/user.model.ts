export interface User {
  id: string;
  email: string;
  password?: string;
  firstName: string;
  lastName: string;
  createdAt: Date;
  isActive: boolean;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignUpRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}