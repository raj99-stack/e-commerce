import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../../services/cart';
import { UserService } from '../../../services/user-service'; // ✅ use UserService instead
import { CartItem, User } from '../../../models/user';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.html',
  styleUrls: ['./cart.css'],
})
export class Cart {
  loggedInUser: User | null = null;

  constructor(
    public cartService: CartService,
    private userService: UserService
  ) {
    // ✅ subscribe to current user
    this.userService.currentUser$.subscribe(user => {
      this.loggedInUser = user;
    });
  }

  get cartItems(): CartItem[] {
    return this.cartService.getCart();
  }

  onAdd(id: number) {
    this.cartService.addItemById(id);
    this.syncCart();
  }

  onRemove(id: number) {
    this.cartService.removeItem(id);
    this.syncCart();
  }

  onDelete(id: number) {
    this.cartService.deleteItem(id);
    this.syncCart();
  }

  // ✅ updated to use UserService instead of WishlistService
  onAddToWishlist(id: number) {
    if (this.loggedInUser) {
      const item = this.cartService.getCart().find(c => c.id === id);
      if (item) {
        const exists = this.loggedInUser.wishlist.find(w => w.id === item.id);
        if (!exists) {
          this.loggedInUser.wishlist.push({ ...item });
          this.userService.updateProfile(this.loggedInUser);
        }
        // remove from cart after moving
        this.cartService.deleteItem(id);
        this.syncCart();
      }
    }
  }

  getIndividualTotal(item: CartItem): number {
    return item.price * item.quantity;
  }

  getTotal(): number {
    return this.cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  }

  // helper to keep cart in sync with user profile
  private syncCart() {
    if (this.loggedInUser) {
      this.loggedInUser.cart = [...this.cartService.getCart()];
      this.userService.updateProfile(this.loggedInUser);
    }
  }
}
