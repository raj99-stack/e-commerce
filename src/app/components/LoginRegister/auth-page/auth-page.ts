import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; // ✅ Import Router
import { LoginForm } from '../login-form/login-form';
import { RegisterForm } from '../register-form/register-form';
import { UserService } from '../../../services/user-service';
import { User } from '../../../models/user';

@Component({
  selector: 'app-auth-page',
  standalone: true,
  imports: [
    CommonModule,
    LoginForm,
    RegisterForm
    // ❌ Removed ProfileDashboard and AdminMain (Router handles them now)
  ],
  templateUrl: './auth-page.html',
  styleUrls: ['./auth-page.css'],
})
export class AuthPage {
  staticMessage: string = 'Welcome to the E-Commerce Portal!';
  
  // We only need to toggle between Login and Register
  showLogin: boolean = true;

  constructor(
    private userService: UserService,
    private router: Router // ✅ Inject Router
  ) {}

  toggleForm() {
  if (this.showLogin) {
    // Currently showing login → go to register
    this.router.navigate(['/register']);
  } else {
    // Currently showing register → go to login
    this.router.navigate(['/login']);
  }
}


  // ✅ New Logic: When user logs in, we Navigate!
  onLoginSuccess(user: User) {
    console.log('Login successful:', user.name);

    // 1. Ensure Service is updated (if not already done by the form)
    // We re-confirm the login with the service to ensure state is set
    this.userService.login(user.email, user.password); 

    // 2. Navigate based on Role
    if (user.role === 'admin') {
      this.router.navigate(['/admin']); // Go to Admin Dashboard
    } else {
      this.router.navigate(['/home']);  // Go to Shop Home
    }
  }
}