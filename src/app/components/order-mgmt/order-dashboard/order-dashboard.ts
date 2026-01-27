import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderMgmt } from '../../../services/order-mgmt';
import { UserService } from '../../../services/user-service'; // ✅ 1. Import UserService

@Component({
  selector: 'app-order-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-dashboard.html',
  styleUrl: './order-dashboard.css'
})
export class OrderDashboard implements OnInit {
  stats = {
    totalOrders: 0,
    totalSpent: 0,
    pendingCount: 0
  };

  constructor(
    private orderMgmt: OrderMgmt,
    private userService: UserService // ✅ 2. Inject UserService
  ) {}

  ngOnInit() {
    // ✅ 3. Subscribe to the User Service directly
    this.userService.currentUser$.subscribe(user => {
      if (user) {
        // Now we are guaranteed to have the user!
        this.stats = this.orderMgmt.getStats(user.id);
      }
    });
  }
}