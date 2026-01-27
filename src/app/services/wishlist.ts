import { Injectable } from '@angular/core';
import { CartItem } from '../models/user';
import { CartService } from './cart';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private wishlist: CartItem[] = [];

  constructor(private cartService: CartService) {}

  getWishlist(): CartItem[] {
    return [...this.wishlist];
  }

  // ✅ ADDED: This method was missing!
  clearWishlist() {
    this.wishlist = [];
  }

  addToWishlist(item: CartItem) {
    const exists = this.wishlist.find(w => w.id === item.id);
    if (!exists) {
      this.wishlist.push({ ...item });
    }
  }

  // Helper: add to wishlist by ID
  addToWishlistById(itemId: number) {
    const item = this.cartService.getCart().find(c => c.id === itemId);
    if (item) {
      const exists = this.wishlist.find(w => w.id === item.id);
      if (!exists) {
        this.wishlist.push({ ...item });
      }
      // remove from cart after moving
      this.cartService.deleteItem(itemId);
    }
  }

  removeFromWishlist(itemId: number) {
    this.wishlist = this.wishlist.filter(i => i.id !== itemId);
  }

  moveToCart(itemId: number) {
    const item = this.wishlist.find(i => i.id === itemId);
    if (item) {
      this.cartService.addItem(item);
      this.removeFromWishlist(itemId);
    }
  }
}