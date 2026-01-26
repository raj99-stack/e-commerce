import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
// We import the Service to inject it
import { OrderMgmt } from '../../../services/order-mgmt';

@Component({
  selector: 'app-order-dashboard',
  standalone: true,
  imports: [CommonModule],
  // 1. Point to the external HTML file
  templateUrl: './order-dashboard.html',
  // 2. Point to the external CSS file
  styleUrl: './order-dashboard.css'
})
export class OrderDashboard implements OnInit {
  stats = {
    totalOrders: 0,
    totalSpent: 0,
    pendingCount: 0
  };

  constructor(private orderMgmt: OrderMgmt) {}

  ngOnInit() {
    // ✅ FIX: Pass the 'activeUserId' so the service filters the data!
    const currentId = this.orderMgmt.activeUserId;
    
    if (currentId) {
      this.stats = this.orderMgmt.getStats(currentId);
    }
  }
}