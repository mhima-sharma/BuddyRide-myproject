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
//     this.http.get<any>('http://localhost:3000/api/auth/user/profile', { headers }).subscribe({
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
//     this.http.put('http://localhost:3000/api/user/profile', this.profileForm.value, { headers }).subscribe({
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
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  user:any;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.profileForm = this.fb.group({
      name:[''],
      email: ['', Validators.required],
      about: [''],
      phone: [''],
      address: [''],
      website: [''],
      dob: [''],
      gender: [''],
      role: [''],
      vehicles: [''],
      emailverify: [''],
      addhar: [null],   // For file input
      License: [null]   // For file input
    });
  }

  ngOnInit(): void {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.get<any>('http://localhost:3000/api/auth/user/profile', { headers }).subscribe({
      next: data => {
        this.profileForm.patchValue(data);
      },
      error: err => {
        console.error('Failed to load profile:', err);
      }
    });
    this.updatedProfile()
  }



  handleFileInput(event: any, controlName: string): void {
    const file = event.target.files[0];
    if (file) {
      this.profileForm.get(controlName)?.setValue(file);
    }
  }
// for updated profile 
  updatedProfile(): void {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.get<any>('http://localhost:3000/api/auth/user/updated/profile', { headers }).subscribe({
      next: data => {
        this.profileForm.patchValue(data);
      },
      error: err => {
        console.error('Failed to load profile:', err);
      }
    });
  }
  
  updateProfile(): void {
    const token = localStorage.getItem('authToken');
    this.user = JSON.parse(localStorage.getItem('user') || '{}');  
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const formData = new FormData();
    if (this.user?.id) {
      formData.append('userId', this.user.id); 
    }
    // Append form fields
    for (const key in this.profileForm.value) {
      if (
        key !== 'addhar' &&
        key !== 'License' &&
        this.profileForm.value[key] !== null &&
        this.profileForm.value[key] !== ''
      ) {
        formData.append(key, this.profileForm.value[key]);
      }
    }

    // Append files
    const aadharFile = this.profileForm.get('addhar')?.value;
    const licenseFile = this.profileForm.get('License')?.value;

    if (aadharFile instanceof File) {
      formData.append('aadharFile', aadharFile);
    }

    if (licenseFile instanceof File) {
      formData.append('drivingLicenseFile', licenseFile);
    }

    // Make HTTP POST request
    this.http.post('http://localhost:3000/api/profile/update-profile', formData, { headers }).subscribe({
      next: (res) => {
        console.log('Profile updated:', res);
        alert('Profile updated successfully!');
      },
      error: (err) => {
        console.error('Profile update failed:', err);
      }
    });
  }
}
