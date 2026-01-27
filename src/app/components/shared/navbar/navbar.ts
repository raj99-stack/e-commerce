import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // ✅ Import RouterModule
import { User } from '../../../models/user';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule], // ✅ Add RouterModule to imports
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class Navbar {
  @Input() currentUser: User | null = null;

  // We only keep 'logout' because the parent might want to handle cleanup.
  // All other navigation is now handled by the template.
  @Output() logout = new EventEmitter<void>();
}