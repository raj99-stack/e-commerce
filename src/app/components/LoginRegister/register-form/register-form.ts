import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../../models/user';   // adjust path to your User model
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-register-form',
  imports: [CommonModule,FormsModule],
  templateUrl: './register-form.html',
  styleUrls: ['./register-form.css']
})
export class RegisterForm {
  @Input() welcome: string = '';
  @Output() registerEvent = new EventEmitter<User>();

  name: string = '';
  email: string = '';
  password: string = '';
  shippingAddress: string = '';
  paymentDetails: string = '';

  register() {
    const newUser: User = {
  id: Date.now(),
  name: this.name,
  email: this.email,
  password: this.password,
  shippingAddress: this.shippingAddress,
  paymentDetails: this.paymentDetails,
  cart: [],
  wishlist: [],
  role: 'user'   // ✅ required
};


    this.registerEvent.emit(newUser);
  }

  get valid(): boolean {
    return this.name !== '' && this.email !== '' && this.password !== '';
  }

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
    this.registerEvent.emit(newUser);
  }
}

}
