import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Product } from '../models/product';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

export const MOCK_USERS: User[] = [
  {
    id: 1,
    name: 'System Admin',
    email: 'admin@example.com',
    password: 'Admin1234@',
    shippingAddress: 'Admin HQ',
    paymentDetails: 'Admin Card',
    cart: [],
    wishlist: [],
    role: 'admin',
  },
  {
    id: 2,
    name: 'John Doe',
    email: 'john@example.com',
    password: 'John1234@',
    shippingAddress: '123 Main Street',
    paymentDetails: 'Visa **** 1234',
    cart: [],
    wishlist: [],
    role: 'user',
  },
];

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private users: User[] = [...MOCK_USERS];

  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  // ✅ Cart count observable
  cartCount$ = this.currentUser$.pipe(
    map(user => user ? user.cart.reduce((sum, item) => sum + item.quantity, 0) : 0)
  );

  constructor() {}

  get loggedInUser(): User | null {
    return this.currentUserSubject.value;
  }

  isLoggedIn(): boolean {
    return this.currentUserSubject.value !== null;
  }

  getAllUsers(): User[] {
    return this.users;
  }

  login(email: string, password: string): User | null {
    const found = this.users.find((u) => u.email === email && u.password === password);
    if (found) {
      this.currentUserSubject.next({ ...found });
      return found;
    }
    return null;
  }

  register(newUser: User): boolean {
    const exists = this.users.some((u) => u.email === newUser.email);
    if (exists) return false;
    this.users.push(newUser);
    return true;
  }

  logout(): void {
    const currentUser = this.currentUserSubject.value;
    if (currentUser) {
      currentUser.cart = [];
      currentUser.wishlist = [];
    }
    this.currentUserSubject.next(null);
  }

  updateProfile(updated: User): void {
    const idx = this.users.findIndex((u) => u.id === updated.id);
    if (idx >= 0) {
      this.users[idx] = { ...updated };
      this.currentUserSubject.next({ ...updated });
    }
  }

  addToCart(product: Product) {
    const currentUser = this.currentUserSubject.value;
    if (!currentUser) {
      alert('You must be logged in to add products to the cart.');
      return;
    }

    if (!currentUser.cart) currentUser.cart = [];

    const existingItem = currentUser.cart.find((i) => i.id === product.id);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      currentUser.cart.push({ ...product, quantity: 1 });
    }

    this.currentUserSubject.next({ ...currentUser });
  }

  addToWishlist(product: Product) {
    const currentUser = this.currentUserSubject.value;
    if (!currentUser) {
      alert('You must be logged in to add products to the wishlist.');
      return;
    }

    if (!currentUser.wishlist) currentUser.wishlist = [];

    const existingItem = currentUser.wishlist.find((i) => i.id === product.id);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      currentUser.wishlist.push({ ...product, quantity: 1 });
    }

    this.currentUserSubject.next({ ...currentUser });
  }

  getUserById(id: number): User | undefined {
    return this.users.find((u) => u.id === id);
  }
}
