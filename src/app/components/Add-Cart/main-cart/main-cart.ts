import { Component, Input } from '@angular/core';
import { User } from '../../../models/user';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Cart } from '../cart/cart';
import { OrderSummary } from '../order-summary/order-summary';
import { EmptyCart } from '../empty-cart/empty-cart';
import { Wishlist } from '../wishlist/wishlist';

@Component({
  selector: 'app-main-cart',
  imports: [CommonModule, FormsModule, Cart, OrderSummary, EmptyCart, Wishlist],
  templateUrl: './main-cart.html',
  styleUrls: ['./main-cart.css'],
})
export class MainCart {
  title = 'E-Commerce(Shopping Cart)';
  @Input() loggedInUser: User | null = null;

  // ✅ Cart handlers now work directly on loggedInUser
  handleRemove(itemId: number) {
    if (!this.loggedInUser) return;
    const item = this.loggedInUser.cart.find((i) => i.id === itemId);
    if (item) {
      if (item.quantity > 1) {
        item.quantity--;
      } else {
        this.loggedInUser.cart = this.loggedInUser.cart.filter((i) => i.id !== itemId);
      }
    }
  }

  handleAdd(itemId: number) {
    if (!this.loggedInUser) return;
    const item = this.loggedInUser.cart.find((i) => i.id === itemId);
    if (item) item.quantity++;
  }

  handleDelete(itemId: number) {
    if (!this.loggedInUser) return;
    this.loggedInUser.cart = this.loggedInUser.cart.filter((i) => i.id !== itemId);
  }

  isCartEmpty(): boolean {
    return (
      !this.loggedInUser ||
      this.loggedInUser.cart.length === 0 ||
      this.loggedInUser.cart.every((i) => i.quantity === 0)
    );
  }

  hasCartItems(): boolean {
    return !!this.loggedInUser && this.loggedInUser.cart.some((i) => i.quantity > 0);
  }

  handleRemoveFromWishlist(itemId: number) {
    if (!this.loggedInUser) return;
    this.loggedInUser.wishlist = this.loggedInUser.wishlist.filter((i) => i.id !== itemId);
  }

  handleMoveToCart(itemId: number) {
    if (!this.loggedInUser) return;
    const item = this.loggedInUser.wishlist.find((i) => i.id === itemId);
    if (item) {
      const cartItem = this.loggedInUser.cart.find((c) => c.id === itemId);
      if (cartItem) {
        cartItem.quantity++;
      } else {
        this.loggedInUser.cart.push({ ...item, quantity: 1 });
      }
      this.loggedInUser.wishlist = this.loggedInUser.wishlist.filter((i) => i.id !== itemId);
    }
  }

  handleAddToWishlist(itemId: number) {
    if (!this.loggedInUser) return;
    const item = this.loggedInUser.cart.find((i) => i.id === itemId);
    if (item) {
      const wishlistItem = this.loggedInUser.wishlist.find((w) => w.id === itemId);
      if (!wishlistItem) {
        this.loggedInUser.wishlist.push({ ...item });
      }
      this.loggedInUser.cart = this.loggedInUser.cart.filter((i) => i.id !== itemId);
    }
  }
}
