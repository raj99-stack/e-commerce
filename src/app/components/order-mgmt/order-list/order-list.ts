import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'; // ✅ 1. IMPORT THIS
import { OrderMgmt } from '../../../services/order-mgmt';
import { Order, OrderStatus } from '../../../models/order';
import { OrderFilterPipe } from '../../../pipes/order-filter.pipe';

@Component({
  selector: 'app-order-list',
  standalone: true,
  // ✅ 2. ADD 'RouterModule' TO THIS LIST
  imports: [CommonModule, ReactiveFormsModule, OrderFilterPipe, RouterModule], 
  templateUrl: './order-list.html',
  styleUrls: ['./order-list.css']
})
export class OrderList implements OnInit {
  orders: Order[] = [];
  searchForm: FormGroup;
  eOrderStatus = OrderStatus;  // Expose Enum to HTML

  constructor(private orderMgmt: OrderMgmt, private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      searchText: [''],
      status: ['All']
    });
  }

  ngOnInit() {
    // Get orders using the stored ID
    this.orders = this.orderMgmt.getOrdersForUser(this.orderMgmt.activeUserId);
  }
}