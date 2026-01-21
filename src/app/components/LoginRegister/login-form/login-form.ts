import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-login-form',
  imports: [CommonModule,FormsModule],
  templateUrl: './login-form.html',
  styleUrls: ['./login-form.css']
})
export class LoginForm {
  @Input() welcome: string = '';
  @Output() loginEvent = new EventEmitter<any>();

  email: string = '';
  password: string = '';

  login() {
    this.loginEvent.emit({ email: this.email, password: this.password });
  }

  get valid(): boolean {
    return this.email !== '' && this.password !== '';
  }

processLogin(form: any) { 
  if (form.valid)
   { 
    this.loginEvent.emit({ email: this.email, password: this.password });
   }
 }

  
}
