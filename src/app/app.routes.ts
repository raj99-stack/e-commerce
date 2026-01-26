import { Routes } from '@angular/router';
import { OrderMain } from './components/order-mgmt/order-main/order-main';
import { OrderDashboard } from './components/order-mgmt/order-dashboard/order-dashboard';
import { OrderList } from './components/order-mgmt/order-list/order-list';
import { OrderDetail } from './components/order-mgmt/order-detail/order-detail';
export const routes: Routes = [
  // When URL is /orders...
// Dashboard Route
  { path: 'orders/dashboard', component: OrderDashboard },
  
  // History Route
  { path: 'orders/history', component: OrderList },

  // ✅ 2. FIX: Add the Detail Route here!
  // This tells Angular: "If URL is orders/detail/ORD-1003, load OrderDetailComponent"
  { path: 'orders/detail/:id', component: OrderDetail },

  // Default Redirect
  { path: 'orders', redirectTo: 'orders/dashboard', pathMatch: 'full' }
];