import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../services/user-service';
import { User } from '../../../models/user';

@Component({
  selector: 'app-login-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './login-form.html',
  styleUrls: ['./login-form.css']
})
export class LoginForm {
  @Input() welcome: string = '';
  @Output() loginSuccess = new EventEmitter<User>();

  email: string = '';
  password: string = '';

  constructor(private userService: UserService) {}

  processLogin(form: any) {
    if (form.valid) {
      const user = this.userService.login(this.email, this.password);
      if (user) {
        alert(`Welcome ${user.name}`);
        this.loginSuccess.emit(user); // ✅ send user to parent
      } else {
        alert('Invalid credentials!');
      }
    }
  }
}
