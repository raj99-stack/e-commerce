import { Component, OnInit, DoCheck } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'; // ✅ Import Router for redirection
import { CartService } from '../../../services/cart';
import { WishlistService } from '../../../services/wishlist';
import { UserService } from '../../../services/user-service'; // ✅ Import UserService
import { CartItem, User } from '../../../models/user';
import { EmptyCart } from '../empty-cart/empty-cart';
import { Cart } from '../cart/cart';
import { OrderSummary } from '../order-summary/order-summary';
import { Wishlist } from '../wishlist/wishlist';

@Component({
  selector: 'app-main-cart',
  standalone: true,
  imports: [CommonModule, FormsModule, EmptyCart, Cart, OrderSummary, Wishlist],
  templateUrl: './main-cart.html',
  styleUrls: ['./main-cart.css'],
})
export class MainCart implements OnInit, DoCheck {
  
  // ❌ REMOVED: @Input() loggedInUser
  // ✅ ADDED: Local property to hold the user
  loggedInUser: User | null = null;

  constructor(
    public cartService: CartService,
    public wishlistService: WishlistService,
    private userService: UserService, // ✅ Inject UserService
    private router: Router
  ) {}

  ngOnInit() {
    // ✅ Subscribe to the User Service
    this.userService.currentUser$.subscribe(user => {
      this.loggedInUser = user;

      if (this.loggedInUser) {
        // 1. Sync User's Cart -> CartService
        // (This ensures items added from Hero Page show up here)
        this.cartService.clearCart();
        if (this.loggedInUser.cart) {
          this.loggedInUser.cart.forEach((item) => this.cartService.addItem(item));
        }

        // 2. Sync User's Wishlist -> WishlistService
        this.wishlistService.clearWishlist(); // Clear old data first
        if (this.loggedInUser.wishlist) {
          this.loggedInUser.wishlist.forEach((item) => this.wishlistService.addToWishlist(item));
        }
      } else {
        // Optional: If user is not logged in, redirect to Login
        // this.router.navigate(['/login']);
      }
    });
  }

  ngDoCheck() {
    // ✅ Keep loggedInUser.cart in sync with Service changes
    // (This ensures if you delete an item in <app-cart>, the User object updates)
    if (this.loggedInUser) {
      this.loggedInUser.cart = [...this.cartService.getCart()];
      // Note: Ideally, we should call userService.updateProfile() here to save persistence,
      // but for now, this keeps the local session in sync.
    }
  }

  get cartItems(): CartItem[] {
    return this.cartService.getCart();
  }

  isCartEmpty(): boolean {
    return this.cartService.isEmpty();
  }

  hasCartItems(): boolean {
    return this.cartService.hasItems();
  }

  get wishlistItems(): CartItem[] {
    return this.wishlistService.getWishlist();
  }
}