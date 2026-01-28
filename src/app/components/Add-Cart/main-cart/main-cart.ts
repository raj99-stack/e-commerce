import { Component, OnInit, DoCheck } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'; // ✅ Import Router for redirection
import { CartService } from '../../../services/cart';
import { UserService } from '../../../services/user-service'; // ✅ Import UserService
import { CartItem, User } from '../../../models/user';
import { EmptyCart } from '../empty-cart/empty-cart';
import { Cart } from '../cart/cart';
import { OrderSummary } from '../order-summary/order-summary';
import { Wishlist } from '../wishlist/wishlist';


@Component({
  selector: 'app-main-cart',
  standalone: true,
  imports: [CommonModule, FormsModule, EmptyCart, OrderSummary, Cart, Wishlist],
  templateUrl: './main-cart.html',
  styleUrls: ['./main-cart.css'],
})
export class MainCart implements OnInit, DoCheck {
  
  loggedInUser: User | null = null;

  constructor(
    public cartService: CartService,
    private userService: UserService, 
    private router: Router
  ) {}

  ngOnInit() {
    // ✅ Subscribe to the User Service
    this.userService.currentUser$.subscribe(user => {
      this.loggedInUser = user;

      if (this.loggedInUser) {
        // 1. Sync User's Cart -> CartService
        this.cartService.clearCart();
        if (this.loggedInUser.cart) {
          this.loggedInUser.cart.forEach((item) => this.cartService.addItem(item));
        }
      } else {
        // Optional: If user is not logged in, redirect to Login
        // this.router.navigate(['/login']);
      }
    });
  }

  ngDoCheck() {
    // ✅ Keep loggedInUser.cart in sync with Service changes
    if (this.loggedInUser) {
      this.loggedInUser.cart = [...this.cartService.getCart()];
      // Optionally persist changes:
      // this.userService.updateProfile(this.loggedInUser);
    }
  }

  // --- CART HELPERS ---
  get cartItems(): CartItem[] {
    return this.cartService.getCart();
  }

  isCartEmpty(): boolean {
    return this.cartService.isEmpty();
  }

  hasCartItems(): boolean {
    return this.cartService.hasItems();
  }

  // --- WISHLIST HELPERS ---
  get wishlistItems(): CartItem[] {
    return this.loggedInUser?.wishlist ?? [];
  }

  removeFromWishlist(id: number) {
    if (this.loggedInUser) {
      this.loggedInUser.wishlist = this.loggedInUser.wishlist.filter(i => i.id !== id);
      this.userService.updateProfile(this.loggedInUser);
    }
  }

  moveToCart(id: number) {
    if (this.loggedInUser) {
      const item = this.loggedInUser.wishlist.find(i => i.id === id);
      if (item) {
        this.loggedInUser.cart.push(item);
        this.loggedInUser.wishlist = this.loggedInUser.wishlist.filter(i => i.id !== id);
        this.userService.updateProfile(this.loggedInUser);
      }
    }
  }
}
