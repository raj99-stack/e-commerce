import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../services/user-service';
import { CartItem, User } from '../../../models/user';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './wishlist.html',
  styleUrls: ['./wishlist.css']
})
export class Wishlist {
  constructor(public userService: UserService) {}

  get wishlistItems(): CartItem[] {
    return this.userService.loggedInUser?.wishlist ?? [];
  }

  onRemove(id: number) {
    const user = this.userService.loggedInUser;
    if (user) {
      user.wishlist = user.wishlist.filter(i => i.id !== id);
      this.userService.updateProfile(user);
    }
  }

  onMoveToCart(id: number) {
    const user = this.userService.loggedInUser;
    if (user) {
      const item = user.wishlist.find(i => i.id === id);
      if (item) {
        user.cart.push(item);
        user.wishlist = user.wishlist.filter(i => i.id !== id);
        this.userService.updateProfile(user);
      }
    }
  }
}
