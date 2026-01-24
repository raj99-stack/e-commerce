import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Navbar } from './components/shared/navbar/navbar';
import { AuthPage } from './components/LoginRegister/auth-page/auth-page';
import { HeroPage } from './components/dashboard/hero/hero';
import { User } from './models/user';
import { MOCK_PRODUCTS, Product } from './models/product';
import { MainCart } from './components/Add-Cart/main-cart/main-cart';
import { AdminMain } from './components/admin-dashboard/admin-main/admin-main';
import { FooterComponent } from './components/shared/footer-component/footer-component';
import { ProfileDashboard } from './components/LoginRegister/profile-dashboard/profile-dashboard';
import { UserService } from './services/user-service';  // ✅ import

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ProfileDashboard, CommonModule, FormsModule, Navbar, AuthPage, HeroPage, MainCart, AdminMain, FooterComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class App {
  loggedInUser: User | null = null;
  currentSection: string = 'dashboard';
  title = 'E-Commerce (Shopping Cart)';
  products: Product[] = [...MOCK_PRODUCTS];
  
  constructor(private userService: UserService) {}

  showSection(section: string) {
    this.currentSection = section;
  }

  handleLogin(user: User) {
    this.loggedInUser = user;
    this.currentSection = user.role === 'admin' ? 'admin' : 'dashboard'; // ✅ go to dashboard after login
  }

  handleLogout() {
    
    this.userService.logout();

    this.loggedInUser = null;
    this.currentSection = 'dashboard'; // back to login page
  }

  onProfileUpdate(updatedUser: User) {
    
  this.userService.updateProfile(updatedUser);   // ✅ persist to service

    this.loggedInUser = updatedUser;
    alert('Profile updated successfully!');
    this.currentSection = 'dashboard'; // ✅ go back after update
 
    
  }

}
