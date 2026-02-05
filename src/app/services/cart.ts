import { Injectable } from '@angular/core';
import { CartItem } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: CartItem[] = [];

  getCart(): CartItem[] {
    return this.cart;
  }

  addItem(item: CartItem) {
    const existing = this.cart.find(i => i.id === item.id);
    if (existing) {
      existing.quantity += item.quantity;
    } else {
      this.cart.push({ ...item, quantity: 1 });
    }
  }
  
  // Increment by ID
  addItemById(itemId: number) {
    const item = this.cart.find(i => i.id === itemId);
    if (item) {
      item.quantity++;
    }
  }

  // Decrement by ID
  removeItem(itemId: number) {
    const item = this.cart.find(i => i.id === itemId);
    if (item) {
      if (item.quantity > 1) {
        item.quantity--;
      } else {
        this.cart = this.cart.filter(i => i.id !== itemId);
      }
    }
  }

  // Delete completely
  deleteItem(itemId: number) {
    this.cart = this.cart.filter(i => i.id !== itemId);
  }

  // Clear all
  clearCart() {
    this.cart = [];
  }

  // Helpers
  isEmpty(): boolean {
    return this.cart.length === 0;
  }

  hasItems(): boolean {
    return this.cart.some(i => i.quantity > 0);
  }
}
