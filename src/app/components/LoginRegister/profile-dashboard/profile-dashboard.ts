import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../../models/user';
 
@Component({
  selector: 'app-profile-dashboard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile-dashboard.html',
  styleUrls: ['./profile-dashboard.css']
})
export class ProfileDashboard implements OnInit {
  @Input() profileData!: User;                     // ✅ parent passes loggedInUser
  @Output() updateEvent = new EventEmitter<User>(); // ✅ emit updated user
 
  profileForm!: FormGroup;
  isEditing: boolean = false;
 
  constructor(private fb: FormBuilder) {}
 
  ngOnInit() {
    this.initForm();
  }
 
  initForm() {
    this.profileForm = this.fb.group({
      name: [this.profileData?.name || '', [Validators.required, Validators.pattern(/^[A-Za-z\s]+$/)]],
      email: [this.profileData?.email || '', [Validators.required, Validators.email]],
      password: [this.profileData?.password || '', [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
      ]],
      shippingAddress: [this.profileData?.shippingAddress || '', [Validators.required, Validators.minLength(10)]],
      paymentDetails: [this.profileData?.paymentDetails || '', [Validators.required]]
    });
  }
 
  enableEdit() {
    this.isEditing = true;
  }
 
  saveChanges() {
    if (this.profileForm.valid) {
      const updatedUser: User = { ...this.profileData, ...this.profileForm.value };
      this.updateEvent.emit(updatedUser); // ✅ send updated user to parent
      this.isEditing = false;
    } else {
      this.profileForm.markAllAsTouched();
    }
  }
 
  cancel() {
    this.isEditing = false;
    this.initForm();
  }
}