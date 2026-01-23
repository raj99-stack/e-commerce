import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Navbar } from './components/shared/navbar/navbar';
import { AuthPage } from './components/LoginRegister/auth-page/auth-page';
import { HeroPage } from './components/dashboard/hero/hero';
import { User } from './models/user';
import { MOCK_PRODUCTS, Product } from './models/product';
import { MainCart } from './components/Add-Cart/main-cart/main-cart';
import { CartItem } from './models/user'; 
import { AdminMain } from './components/admin-dashboard/admin-main/admin-main';
import { FooterComponent } from './components/shared/footer-component/footer-component';
import { ProfileDashboard } from './components/LoginRegister/profile-dashboard/profile-dashboard';


@Component({
  selector: 'app-root',
  imports: [ProfileDashboard,CommonModule, FormsModule, Navbar, AuthPage, HeroPage, MainCart,AdminMain,FooterComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class App {

  loggedInUser: User | null = null;
  currentSection: string = 'dashboard';
  title = 'E-Commerce(Shopping Cart)';
  products: Product[] = [...MOCK_PRODUCTS];



  showSection(section: string) {
    this.currentSection = section;
  }

  handleLogin(user: User) {
    this.loggedInUser = user;
    this.currentSection = user.role === 'admin' ? 'admin' : 'dashboard';
  }

  handleLogout() {
    this.loggedInUser = null;
    this.currentSection = 'login'; // back to login page
  }

  
onProfileUpdate(updatedUser: User) {
  this.loggedInUser = updatedUser;
  alert('Profile updated successfully!');
  this.currentSection = 'dashboard'; // ✅ go back after update
}

}
