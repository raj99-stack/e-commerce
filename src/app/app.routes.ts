import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  // Lazy load Dashboard (HeroPage)
  {
    path: 'home',
    loadComponent: () =>
      import('./components/dashboard/hero/hero').then(m => m.HeroPage),
  },

  // Lazy load Auth (Login/Register/Profile)
  {
    path: 'login',
    loadComponent: () =>
      import('./components/LoginRegister/auth-page/auth-page').then(m => m.AuthPage),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./components/LoginRegister/register-form/register-form').then(m => m.RegisterForm),
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('./components/LoginRegister/profile-dashboard/profile-dashboard').then(m => m.ProfileDashboard),
  },

  // Lazy load Cart
  {
    path: 'cart',
    loadComponent: () =>
      import('./components/Add-Cart/main-cart/main-cart').then(m => m.MainCart),
  },

  // Lazy load Orders with children
  {
    path: 'orders',
    loadComponent: () =>
      import('./components/order-mgmt/order-main/order-main').then(m => m.OrderMain),
    children: [
      { path: '', redirectTo: 'history', pathMatch: 'full' },
      {
        path: 'history',
        loadComponent: () =>
          import('./components/order-mgmt/order-list/order-list').then(m => m.OrderList),
      },
      {
        path: 'detail/:id',
        loadComponent: () =>
          import('./components/order-mgmt/order-detail/order-detail').then(m => m.OrderDetail),
      },
    ],
  },

  // Lazy load Admin with children
  {
    path: 'admin',
    loadComponent: () =>
      import('./components/admin-dashboard/admin-main/admin-main').then(m => m.AdminMain),
    children: [
      { path: '', redirectTo: 'products', pathMatch: 'full' },
      {
        path: 'products',
        loadComponent: () =>
          import('./components/admin-dashboard/view-product/view-product').then(m => m.ViewProduct),
      },
      {
        path: 'add',
        loadComponent: () =>
          import('./components/admin-dashboard/add-product/add-product').then(m => m.AddProduct),
      },
      {
        path: 'manage',
        loadComponent: () =>
          import('./components/admin-dashboard/edit-product/edit-product').then(m => m.Editproduct),
      },
      {
        path: 'edit/:id',
        loadComponent: () =>
          import('./components/admin-dashboard/editformcomponent/editformcomponent').then(m => m.Editformcomponent),
      },
    ],
  },

  // Wildcard route
  { path: '**', redirectTo: 'home' },
];
