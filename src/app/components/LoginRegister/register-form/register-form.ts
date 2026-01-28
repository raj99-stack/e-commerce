import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../../models/user';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../services/user-service';
import { Router } from '@angular/router';   // ✅ Add this

@Component({
  selector: 'app-register-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './register-form.html',
  styleUrls: ['./register-form.css']
})
export class RegisterForm {
  @Input() welcome: string = '';

  name: string = '';
  email: string = '';
  password: string = '';
  shippingAddress: string = '';
  paymentDetails: string = '';

  constructor(
    private userService: UserService,
    private router: Router   // ✅ Inject Router
  ) {}

  processRegister(form: any) {
    if (form.valid) {
      const newUser: User = {
        id: Date.now(),
        name: this.name,
        email: this.email,
        password: this.password,
        shippingAddress: this.shippingAddress,
        paymentDetails: this.paymentDetails,
        cart: [],
        wishlist: [],
        role: 'user'
      };
      const success = this.userService.register(newUser);
      if (success) {
        alert('User Registered Successfully');
        this.router.navigate(['/login']);   // ✅ Redirect to login page
      } else {
        alert('Email already exists. Please login.');
        this.router.navigate(['/login']);   // ✅ Also redirect to login
      }
    }
  }
}
