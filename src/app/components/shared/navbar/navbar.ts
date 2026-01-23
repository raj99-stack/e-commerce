import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../../../models/user';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class Navbar {
  @Input() currentUser: User | null = null;

  // ✅ Emit events when buttons are clicked
  @Output() navigateDashboard = new EventEmitter<void>();
  @Output() navigateLogin = new EventEmitter<void>();
  @Output() navigateRegister = new EventEmitter<void>();
  @Output() navigateCart = new EventEmitter<void>();
  @Output() logout = new EventEmitter<void>();
  @Output() navigateProfile = new EventEmitter<void>();

}
