import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Product } from '../models/product';
import { BehaviorSubject } from 'rxjs'; // ✅ Import this

export const MOCK_USERS: User[] = [
  // ... (Keep your existing MOCK_USERS array here) ...
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

  // ✅ 1. Create a "Subject" that holds the current value and broadcasts changes
  private currentUserSubject = new BehaviorSubject<User | null>(null);

  // ✅ 2. Expose it as an Observable (so components can listen)
  currentUser$ = this.currentUserSubject.asObservable();

  constructor() {}

  // Getter for current value (snapshot)
  get loggedInUser(): User | null {
    return this.currentUserSubject.value;
  }

  getAllUsers(): User[] {
    return this.users;
  }

  login(email: string, password: string): User | null {
    const found = this.users.find((u) => u.email === email && u.password === password);
    if (found) {
      // ✅ 3. Broadcast the new user to the entire app
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
    // ✅ 4. Broadcast null (user logged out)
    this.currentUserSubject.next(null);
  }

  updateProfile(updated: User): void {
    const idx = this.users.findIndex((u) => u.id === updated.id);
    if (idx >= 0) {
      this.users[idx] = { ...updated };
      // ✅ 5. Broadcast the updated profile
      this.currentUserSubject.next({ ...updated });
    }
  }

  // --- CART & WISHLIST Logic (Keep your existing logic) ---
  addToCart(product: Product) {
    const currentUser = this.currentUserSubject.value; // Get current value safely
    if (!currentUser) return;

    if (!currentUser.cart) currentUser.cart = [];

    const existingItem = currentUser.cart.find((i) => i.id === product.id);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      currentUser.cart.push({ ...product, quantity: 1 });
    }

    // Notify app that cart changed
    this.currentUserSubject.next(currentUser);
  }

  addToWishlist(product: Product) {
    const currentUser = this.currentUserSubject.value;
    if (!currentUser) return;

    if (!currentUser.wishlist) currentUser.wishlist = [];

    const existingItem = currentUser.wishlist.find((i) => i.id === product.id);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      currentUser.wishlist.push({ ...product, quantity: 1 });
    }

    // Notify app that wishlist changed
    this.currentUserSubject.next(currentUser);
  }

  // Add this method inside UserService class
  getUserById(id: number): User | undefined {
    return this.users.find((u) => u.id === id);
  }
}
