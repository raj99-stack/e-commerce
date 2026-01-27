import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginForm } from '../login-form/login-form';
import { RegisterForm } from '../register-form/register-form';
import { ProfileDashboard } from '../profile-dashboard/profile-dashboard';
import { Product, MOCK_PRODUCTS } from '../../../models/product';
import { AdminMain } from '../../admin-dashboard/admin-main/admin-main';
import { UserService } from '../../../services/user-service';
import { User } from '../../../models/user';
 
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
  staticMessage: string = 'Welcome to the E-Commerce Portal!';
  products: Product[] = [...MOCK_PRODUCTS];
  showLogin: boolean = true;
  showProfile: boolean = false;
 
  constructor(private userService: UserService) {}
 
  get loggedInUser() {
    return this.userService.getLoggedInUser();
  }
 
  toggleForm() {
    this.showLogin = !this.showLogin;
  }
 
  signOut() {
    this.userService.logout();
    this.showLogin = true;
    this.showProfile = false;
  }
 
  onNavigateProfile() {
    this.showProfile = true;
  }
 
  @Output() userLoggedIn = new EventEmitter<User>();
 
  onLoginSuccess(user: User) {
    this.userLoggedIn.emit(user);   // send user to App
    this.showLogin = false;
    this.showProfile = false;
  }
}
 
 