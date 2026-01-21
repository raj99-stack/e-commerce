import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CartItem } from '../../../models/user';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.html',
  styleUrls: ['./cart.css'],
})
export class Cart {
  @Input() cartItems: CartItem[] = [];
  @Output() removeItem = new EventEmitter<number>();
  @Output() addItem = new EventEmitter<number>();
  @Output() deleteItem = new EventEmitter<number>();
  @Output() addToWishlist = new EventEmitter<number>(); 

  onAdd(id: number) {
    this.addItem.emit(id);
  }

  onRemove(id: number) {
    this.removeItem.emit(id);
  }

  onDelete(id: number) {
    this.deleteItem.emit(id);
  }

  onAddToWishlist(id: number) {
    this.addToWishlist.emit(id); 
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
}
