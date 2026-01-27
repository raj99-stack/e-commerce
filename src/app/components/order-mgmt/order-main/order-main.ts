import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; 
import { OrderMgmt } from '../../../services/order-mgmt';
import { UserService } from '../../../services/user-service'; // ✅ Import UserService

@Component({
  selector: 'app-order-main',
  standalone: true,
  imports: [CommonModule, RouterModule], 
  templateUrl: './order-main.html',
  styleUrls: ['./order-main.css']
})
export class OrderMain implements OnInit {
  
  // ❌ @Input() currentUserId is removed. 
  // The Router does not pass inputs this way.

  constructor(
    private orderMgmt: OrderMgmt,
    private userService: UserService // ✅ Inject User Service
  ) {}

  ngOnInit() {
    // ✅ Subscribe to the reactive user stream
    this.userService.currentUser$.subscribe(user => {
      if (user) {
        // We set the active ID in the service so child components can use it
        this.orderMgmt.activeUserId = user.id;
      }
    });
  }
}