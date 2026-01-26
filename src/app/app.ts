import { Component, OnInit } from '@angular/core';
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

// ✅ 1. Import the Order Parent Component
import { OrderMain } from './components/order-mgmt/order-main/order-main';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  // ✅ 2. Add it to the imports array
  imports: [
    CommonModule, 
    FormsModule, 
    Navbar, 
    AuthPage, 
    HeroPage, 
    MainCart, 
    AdminMain, 
    FooterComponent, 
    OrderMain
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class App{

  loggedInUser: User | null = null;
  
  // This tracks which page is visible
  currentSection: string = 'dashboard'; 
  
  title = 'E-Commerce(Shopping Cart)';
  products: Product[] = [...MOCK_PRODUCTS];
  constructor(private router: Router) {}
  showSection(section: string) {
    this.currentSection = section;
  }
  

  handleLogin(user: User) {
    this.loggedInUser = user;
    this.currentSection = user.role === 'admin' ? 'admin' : 'dashboard';
  }

  handleLogout() {
    this.loggedInUser = null;
    this.currentSection = 'login'; 
  }
}