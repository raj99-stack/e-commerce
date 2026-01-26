import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // ✅ Import RouterModule
import { OrderMgmt } from '../../../services/order-mgmt';

@Component({
  selector: 'app-order-main',
  standalone: true,
  imports: [CommonModule, RouterModule], // ✅ Add RouterModule here
  templateUrl: './order-main.html',
  styleUrls: ['./order-main.css'] // Assuming you have CSS
})
export class OrderMain {
@Input() currentUserId: number | undefined;

  constructor(private orderMgmt: OrderMgmt) {}

  ngOnInit() {
    // ✅ Fix: Pass the Input ID to the Service so children can see it
    if (this.currentUserId) {
      this.orderMgmt.activeUserId = this.currentUserId;
    }
  }
}