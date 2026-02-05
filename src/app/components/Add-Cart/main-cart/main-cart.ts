import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../../../services/cart';
import { UserService } from '../../../services/user-service';
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
export class MainCart implements OnInit {
  loggedInUser: User | null = null;
 
  constructor(
    public cartService: CartService,
    private userService: UserService,
    private router: Router,
  ) {}
 
  ngOnInit() {
    this.loggedInUser = this.userService.loggedInUser;
    if (!this.loggedInUser) {
      this.router.navigate(['/login']);
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
    return this.loggedInUser?.wishlist ?? [];
  }
 
  removeFromWishlist(id: number) {
    if (this.loggedInUser) {
      this.loggedInUser.wishlist = this.loggedInUser.wishlist.filter((i) => i.id !== id);
      this.userService.updateProfile(this.loggedInUser);
    }
  }
 
  moveToCart(id: number) {
    if (this.loggedInUser) {
      const item = this.loggedInUser.wishlist.find((i) => i.id === id);
      if (item) {
        this.cartService.addItem({ ...item, quantity: 1 });
 
        this.loggedInUser.wishlist = this.loggedInUser.wishlist.filter((i) => i.id !== id);
        this.userService.updateProfile(this.loggedInUser);
 
        // console.log('Cart after move:', this.cartService.getCart());
      }
    }
  }
}
 
 