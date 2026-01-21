import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CartItem } from '../../../models/user';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-summary',
  imports: [FormsModule, CommonModule],
  templateUrl: './order-summary.html',
  styleUrls: ['./order-summary.css']
})
export class OrderSummary {
  @Input() cartItems: CartItem[] = [];

  couponCode: string = '';
  discount: number = 0;
  deliveryCharge: number = 50;

  getIndividualTotal(item: CartItem): number {
    return item.price * item.quantity;
  }

  getOriginalTotal(): number {
    return this.cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  }

  getGrandTotal(): number {
    const originalTotal = this.getOriginalTotal();

    const delivery = originalTotal > 2000 ? 0 : this.deliveryCharge;

    return originalTotal - this.discount + delivery;
  }

  getTotalSavings(): number {
    return this.discount + (this.getOriginalTotal() > 2000 ? this.deliveryCharge : 0);
  }

  //For Discount purpose
  applyCoupon() {
    const originalTotal = this.getOriginalTotal();

    if (this.couponCode === 'newuser') {
      this.discount = Math.floor(originalTotal * 0.1); 
    } else {
      this.discount = 0;
      alert('Invalid coupon code');
    }
  }

  proceedOrder() {
    alert(`Order placed! Final amount: ₹${this.getGrandTotal()}`);
    this.cartItems=[];
  }
}
