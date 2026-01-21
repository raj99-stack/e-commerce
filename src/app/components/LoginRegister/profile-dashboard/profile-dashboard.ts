import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../../models/user';

@Component({
  selector: 'app-profile-dashboard',
  imports: [FormsModule],
  templateUrl: './profile-dashboard.html',
  styleUrls: ['./profile-dashboard.css']
})
export class ProfileDashboard {
  @Input() profileData!: User;   // strongly typed input
  @Output() updateEvent = new EventEmitter<User>();

  // Local editable copy
  editableProfile: User = {
  id: 0,
  name: '',
  email: '',
  password: '',
  shippingAddress: '',
  paymentDetails: '',
  cart: [],
  wishlist: [],
  role: 'user'   // ✅ required
};

  ngOnChanges() {
    if (this.profileData) {
      this.editableProfile = { ...this.profileData };
    }
  }

  saveChanges() {
    this.updateEvent.emit(this.editableProfile);
  }

  get valid(): boolean {
    return this.editableProfile.name !== '' &&
           this.editableProfile.email !== '' &&
           this.editableProfile.password !== '';
  }
}
