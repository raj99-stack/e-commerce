import { Injectable } from '@angular/core';
import { User } from '../models/user';

export const MOCK_USERS: User[] = [
  {
    id: 1,
    name: 'System Admin',
    email: 'admin@example.com',
    password: 'Admin123@',   // ✅ valid strong password
    shippingAddress: 'Admin HQ',
    paymentDetails: 'Admin Card',
    cart: [],
    wishlist: [],
    role: 'admin'
  },
  {
    id: 2,
    name: 'John Doe',
    email: 'john@example.com',
    password: 'John1234@',    // ✅ valid strong password
    shippingAddress: '123 Main Street',
    paymentDetails: 'Visa **** 1234',
    cart: [],
    wishlist: [],
    role: 'user'
  },
  {
    id: 3,
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: 'Jane1234@',    // ✅ updated
    shippingAddress: '456 Oak Avenue',
    paymentDetails: 'Mastercard **** 5678',
    cart: [],
    wishlist: [],
    role: 'user'
  }
];

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private users: User[] = [...MOCK_USERS];
  private loggedInUser: User | null = null;

  getAllUsers(): User[] {
    return this.users;
  }

  login(email: string, password: string): User | null {
    const found = this.users.find(u => u.email === email && u.password === password);
    if (found) {
      this.loggedInUser = { ...found };
      return this.loggedInUser;
    }
    return null;
  }

  register(newUser: User): boolean {
    const exists = this.users.some(u => u.email === newUser.email);
    if (exists) return false;
    this.users.push(newUser);
    return true;
  }

  updateProfile(updated: User): void {
    const idx = this.users.findIndex(u => u.id === updated.id);
    if (idx >= 0) {
      this.users[idx] = { ...updated };
      this.loggedInUser = { ...updated };
    }
  }

  getLoggedInUser(): User | null {
    return this.loggedInUser;
  }

  logout(): void {
    this.loggedInUser = null;
  }
}
