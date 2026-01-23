import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginForm } from '../login-form/login-form';
import { RegisterForm } from '../register-form/register-form';
import { ProfileDashboard } from '../profile-dashboard/profile-dashboard';
import { User, MOCK_USERS } from '../../../models/user';
import { MOCK_PRODUCTS, Product } from '../../../models/product';
import { AdminMain } from '../../admin-dashboard/admin-main/admin-main';
import { Navbar } from '../../shared/navbar/navbar';

@Component({
  selector: 'app-auth-page',
  standalone: true,
  imports: [
    CommonModule,
    LoginForm,
    RegisterForm,
    ProfileDashboard,
    AdminMain,
  
  ],
  templateUrl: './auth-page.html',
  styleUrls: ['./auth-page.css'],
})
export class AuthPage {
  staticMessage: string = 'Welcome to the E‑Commerce Portal!';
  users: User[] = [...MOCK_USERS];
  showLogin: boolean = true;
  loggedInUser: User | null = null;
  products: Product[] = [...MOCK_PRODUCTS];
  showProfile: boolean = false;

  @Output() userLoggedIn = new EventEmitter<User>();
  @Output() userLoggedOut = new EventEmitter<void>();

  onLogin(event: any) {
    const found = this.users.find(u => u.email === event.email && u.password === event.password);
    if (found) {
      this.loggedInUser = { ...found };
      this.userLoggedIn.emit(this.loggedInUser);
      alert(`Welcome ${found.role === 'admin' ? 'Admin' : found.name}`);
    } else {
      alert('Invalid credentials!');
    }
  }

  onRegister(event: User) {
    const exists = this.users.find((u) => u.email === event.email);
    if (!exists) {
      this.users.push(event);
      alert('User Registered Successfully');
      this.showLogin = true;
    } else {
      alert('Email already exists. Please login.');
      this.showLogin = true;
    }
  }

  onProfileUpdate(updated: User) {
    const idx = this.users.findIndex((u) => u.email === updated.email);
    if (idx >= 0) this.users[idx] = { ...updated };
    this.loggedInUser = { ...updated };
    alert('Profile Updated Successfully');
  }

  toggleForm() {
    this.showLogin = !this.showLogin;
  }

  signOut() {
    this.loggedInUser = null;
    this.userLoggedOut.emit();
    this.showLogin = true;
    this.showProfile = false;
  }

  onNavigateProfile() {
    this.showProfile = true;
  }
}
