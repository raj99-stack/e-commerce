import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CartItem } from '../../../models/user';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './wishlist.html',
  styleUrls: ['./wishlist.css']
})
export class Wishlist {
  @Input() wishlistItems: CartItem[] = [];
  @Output() removeFromWishlist = new EventEmitter<number>();
  @Output() moveToCart = new EventEmitter<number>();

  onRemove(id: number) {
    this.removeFromWishlist.emit(id);
  }

  onMoveToCart(id: number) {
    this.moveToCart.emit(id);
  }
}
