import { Routes } from '@angular/router';
import { HeroPage } from './components/dashboard/hero/hero';
import { AuthPage } from './components/LoginRegister/auth-page/auth-page';
import { MainCart } from './components/Add-Cart/main-cart/main-cart';
import { ProfileDashboard } from './components/LoginRegister/profile-dashboard/profile-dashboard';
import { AdminMain } from './components/admin-dashboard/admin-main/admin-main';

// Order Components
import { OrderMain } from './components/order-mgmt/order-main/order-main';
import { OrderDashboard } from './components/order-mgmt/order-dashboard/order-dashboard';
import { OrderList } from './components/order-mgmt/order-list/order-list';
import { OrderDetail } from './components/order-mgmt/order-detail/order-detail';
import { RegisterForm } from './components/LoginRegister/register-form/register-form';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HeroPage },
  { path: 'login', component: AuthPage },
  {path: 'register', component:RegisterForm},
  { path: 'cart', component: MainCart },
  { path: 'profile', component: ProfileDashboard },
  { path: 'admin', component: AdminMain },

  // ✅ NESTED ROUTING FIX
  { 
    path: 'orders', component: OrderMain, // 1. Load the Shell (Sidebar + Outlet)
    children: [           // 2. Load these children INTO OrderMain's outlet
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, 
      { path: 'dashboard', component: OrderDashboard },
      { path: 'history', component: OrderList },
      { path: 'detail/:id', component: OrderDetail }
    ]
  },

  { path: '**', redirectTo: 'home' } 
];