import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { User } from '../../../models/user';
import { UserService } from '../../../services/user-service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class Navbar {
  @Input() currentUser: User | null = null;
  @Output() logout = new EventEmitter<void>();

  cartCount: number = 0;

  constructor(private userService: UserService) {
    this.userService.cartCount$.subscribe(count => {
      this.cartCount = count;   // ✅ updates automatically
    });
  }
}
