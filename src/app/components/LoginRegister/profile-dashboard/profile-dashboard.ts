import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule, TitleCasePipe, DatePipe } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../../models/user';

@Component({
  selector: 'app-profile-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TitleCasePipe,
    DatePipe
  ],
  templateUrl: './profile-dashboard.html',
  styleUrls: ['./profile-dashboard.css']
})
export class ProfileDashboard implements OnInit, OnChanges {
  @Input() profileData: User | null = null;
  @Output() updateEvent = new EventEmitter<User>();

  profileForm!: FormGroup;
  isEditing: boolean = false;
  lastUpdated: Date = new Date();

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.initForm();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['profileData'] && this.profileData) {
      this.initForm();
    }
  }

  initForm() {
    this.profileForm = this.fb.group({
      name: [
        this.profileData?.name || '',
        [Validators.required, Validators.pattern(/^[A-Za-z\s]+$/)] // ✅ no numbers allowed
      ],
      email: [
        this.profileData?.email || '',
        [Validators.required, Validators.email] // ✅ proper email format
      ],
      password: [
        this.profileData?.password || '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
          // ✅ same regex as register: at least 1 uppercase, 1 number, 1 special char
        ]
      ],
      shippingAddress: [
        this.profileData?.['shippingAddress'] || '',
        [Validators.required, Validators.minLength(10)]
      ]
    });
  }

  enableEdit() {
    this.isEditing = true;
  }

  saveChanges() {
    if (this.profileForm.valid) {
      const updatedUser: User = { ...this.profileData!, ...this.profileForm.value };
      this.updateEvent.emit(updatedUser);
      this.isEditing = false;
      this.lastUpdated = new Date();
    } else {
      this.profileForm.markAllAsTouched();
    }
  }

  cancel() {
    this.isEditing = false;
    this.initForm();
  }
}
