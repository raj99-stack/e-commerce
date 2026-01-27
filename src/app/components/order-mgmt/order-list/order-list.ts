import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'; 
import { OrderMgmt } from '../../../services/order-mgmt';
import { Order, OrderStatus } from '../../../models/order';
import { OrderFilterPipe } from '../../../pipes/order-filter.pipe';
import { UserService } from '../../../services/user-service'; // ✅ 1. Import UserService

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, OrderFilterPipe, RouterModule], 
  templateUrl: './order-list.html',
  styleUrls: ['./order-list.css']
})
export class OrderList implements OnInit {
  orders: Order[] = [];
  searchForm: FormGroup;
  eOrderStatus = OrderStatus;

  constructor(
    private orderMgmt: OrderMgmt, 
    private fb: FormBuilder,
    private userService: UserService // ✅ 2. Inject UserService
  ) {
    this.searchForm = this.fb.group({
      searchText: [''],
      status: ['All']
    });
  }

  ngOnInit() {
    // ✅ 3. Subscribe to the User Service directly
    // This ensures we wait until the User is actually loaded before fetching orders
    this.userService.currentUser$.subscribe(user => {
      if (user) {
        console.log("Fetching orders for User ID:", user.id); // Debug log
        this.orders = this.orderMgmt.getOrdersForUser(user.id);
      }
    });
  }
}