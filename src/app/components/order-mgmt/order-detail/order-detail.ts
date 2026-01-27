import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'; // ✅ 1. Import FormsModule for the input box
import { OrderMgmt } from '../../../services/order-mgmt';
import { Order, OrderStatus } from '../../../models/order';

@Component({
  selector: 'app-order-detail',
  standalone: true,
  // ✅ 2. Add FormsModule to imports so [(ngModel)] works
  imports: [CommonModule, RouterModule, FormsModule], 
  templateUrl: './order-detail.html', // Make sure this matches your file name
  styleUrls: ['./order-detail.css']
})
export class OrderDetail implements OnInit {
  order: Order | undefined;
  eOrderStatus = OrderStatus; 

  // ✅ 3. New State Variables for the Message Box
  showCancelParams = false;
  showReturnParams = false;
  actionReason = ''; // Stores the user's input

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private orderMgmt: OrderMgmt
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.order = this.orderMgmt.getOrderById(id);
    }
  }

  // --- CANCEL LOGIC ---
  
  // Triggered when clicking "Cancel Order" button
  initiateCancel() {
    this.showCancelParams = true;
    this.showReturnParams = false;
    this.actionReason = ''; // Reset text
  }

  // Triggered when clicking "Confirm" inside the red box
  submitCancel() {
    // 1. Validation: specific reason required
    if (!this.actionReason.trim()) {
      alert('Please provide a reason for cancellation.');
      return;
    }

    if (this.order) {
      // 2. Call Service (You can log the reason here for now)
      console.log('Cancelling Order. Reason:', this.actionReason);
      
      this.orderMgmt.cancelOrder(this.order.id);
      
      // 3. Refresh UI
      this.showCancelParams = false;
      this.order = this.orderMgmt.getOrderById(this.order.id); 
    }
  }

  // --- RETURN LOGIC ---

  // Triggered when clicking "Return Items" button
  initiateReturn() {
    this.showReturnParams = true;
    this.showCancelParams = false;
    this.actionReason = '';
  }

  // Triggered when clicking "Submit" inside the yellow box
  submitReturn() {
    if (!this.actionReason.trim()) {
      alert('Please describe the issue with the item.');
      return;
    }

    if (this.order) {
      console.log('Returning Order. Reason:', this.actionReason);
      
      this.orderMgmt.returnOrder(this.order.id);
      
      // Refresh UI
      this.showReturnParams = false;
      this.order = this.orderMgmt.getOrderById(this.order.id);
    }
  }

  // --- COMMON HELPERS ---

  // Closes the box if user clicks "Go Back"
  closeActionBox() {
    this.showCancelParams = false;
    this.showReturnParams = false;
  }

  goBack() {
    this.router.navigate(['/orders/history']);
  }
}