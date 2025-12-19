// import { CommonModule } from '@angular/common';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

// @Component({
//   selector: 'app-profile',
//   imports: [ReactiveFormsModule, CommonModule,FormsModule],
//   templateUrl: './profile.component.html',
//   styleUrls: ['./profile.component.css'] // fixed typo from `styleUrl` to `styleUrls`
// })
// export class ProfileComponent implements OnInit {
//   user = {
//     name:"",
//     location: 'New York, NY',
//     about: 'short note about your self',
//     phone: '+1 123 456 7890',
//     address: '525 E 68th Street, New York, NY 10651-78',
//     website: 'www.jeremyrose.com',
//     birthday: 'June 5, 1992',
//     gender: 'Male',
//     Role: 'Driver',
//     Vehicles: 'add',
//     avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
//   };

//   profileForm: FormGroup;

//   constructor(private fb: FormBuilder, private http: HttpClient) {
//     this.profileForm = this.fb.group({
//       email: ['',Validators.required],
//       about: [''],
//       phone: [''],
//       address: [''],
//       website: [''],
//       birthday: [''],
//       gender: [''],
//       Role: [''],
//       Vehicles: [''],
//       addhar: [''],
//       License:[''],
//       emailverify:[''],
     
//     });
//   }

//   ngOnInit(): void {
//     const token = localStorage.getItem('authToken'); // Get the token from localStorage
//     const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`); // Set the token in the headers
// console.log(token,"token")
//     // GET request to fetch profile
//     this.http.get<any>('https://backend-bla-bla.onrender.com/api/auth/user/profile', { headers }).subscribe({
//       next: data => {
//         this.profileForm.patchValue(data); // Fill the form with the data from the backend
//         this.user = data; // Optionally, store the user data for the UI (like profile card)
//       },
//       error: err => {
//         console.error('Failed to load profile', err); // Handle error
//       }
//     });
//   }

//   updateProfile(): void {
//     const token = localStorage.getItem('token'); // Get the token from localStorage
//     const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`); // Set the token in the headers

//     // PUT request to update profile
//     this.http.put('https://backend-bla-bla.onrender.com/api/user/profile', this.profileForm.value, { headers }).subscribe({
//       next: () => {
//         alert('Profile updated!'); // Notify user after successful update
//       },
//       error: err => {
//         console.error('Failed to update profile', err); // Handle error
//       }
//     });
//   }
// }

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HeaderComponent } from '../../header/header.component';
import { FooterComponent } from '../../footer/footer.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    HeaderComponent,
    FooterComponent
  ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  user: any = null;
  showForm = false;
  otheData: any;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.profileForm = this.fb.group({
      name: [''],
      email: ['', Validators.required],
      about: [''],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      address: ['', Validators.required],
      website: [''],
      dob: ['', [Validators.required, this.minAgeValidator(18)]],
      gender: ['', Validators.required],
      role: ['', Validators.required],
      vehicles: [''],
      emailverify: [''],
      addhar: [null, Validators.required],
      addharnumber: [null, Validators.required, Validators.pattern(/^[2-9]{1}[0-9]{11}$/)],
      License: [null]
    });
  }
  toggleForm(): void {
    this.showForm = !this.showForm;
  }

  ngOnInit(): void {
    this.loadProfile();
    this.updatedProfile();
  }

  minAgeValidator(minAge: number) {
    return (control: any) => {
      if (!control.value) return null;
  
      const dob = new Date(control.value);
      const today = new Date();
  
      let age = today.getFullYear() - dob.getFullYear();
      const monthDiff = today.getMonth() - dob.getMonth();
  
      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < dob.getDate())
      ) {
        age--;
      }
  
      return age >= minAge ? null : { minAge: true };
    };
  }
  

  handleFileInput(event: any, controlName: string): void {
    const file = event.target.files[0];
    if (file) {
      this.profileForm.get(controlName)?.setValue(file);
    }
  }

  updatedProfile(): void {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${token}`
    );

    this.http
      .get<any>(
        'https://backend-bla-bla.onrender.com/api/auth/user/updated/profile',
        { headers }
      )
      .subscribe({
        next: data => {
          this.otheData = data;
          this.profileForm.patchValue(data);
        },
        error: err => console.error(err)
      });
  }

  updateProfile(): void {
    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      return;
    }

    const token = localStorage.getItem('authToken');
    this.user = JSON.parse(localStorage.getItem('user') || '{}');

    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${token}`
    );

    const formData = new FormData();

    if (this.user?.id) {
      formData.append('userId', this.user.id);
    }

    for (const key in this.profileForm.value) {
      if (
        key !== 'addhar' &&
        key !== 'License' &&
        this.profileForm.value[key]
      ) {
        formData.append(key, this.profileForm.value[key]);
      }
    }

    if (this.profileForm.get('addhar')?.value instanceof File) {
      formData.append(
        'aadharFile',
        this.profileForm.get('addhar')?.value
      );
    }

    if (this.profileForm.get('License')?.value instanceof File) {
      formData.append(
        'drivingLicenseFile',
        this.profileForm.get('License')?.value
      );
    }

    this.http
      .post(
        'https://backend-bla-bla.onrender.com/api/profile/update-profile',
        formData,
        { headers }
      )
      .subscribe({
        next: () => alert('Profile updated successfully!'),
        error: err => console.error(err)
      });
  }

  private loadProfile(): void {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${token}`
    );

    this.http
      .get<any>(
        'https://backend-bla-bla.onrender.com/api/auth/user/profile',
        { headers }
      )
      .subscribe({
        next: raw => {
          this.user = raw?.data ?? raw;
          this.profileForm.patchValue(this.user);
          localStorage.setItem('user', JSON.stringify(this.user));
        },
        error: err => console.error(err)
      });
  }
}
