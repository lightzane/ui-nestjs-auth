import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../http.service';
import { User } from '../shared/models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  roles: string[] = ['member', 'admin'];
  registrationForm: FormGroup;
  isSubmitted = false;

  constructor(private fb: FormBuilder, private router: Router, private httpService: HttpService) { }

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5), Validators.pattern(/^[a-zA-Z]+$/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      role: ['member', [Validators.required]]
    });
  }

  get name(): AbstractControl { // commonly used in HTML
    return this.registrationForm.get('name');
  }

  get email(): AbstractControl {
    return this.registrationForm.get('email');
  }

  get password(): AbstractControl {
    return this.registrationForm.get('password');
  }

  register(): void {
    this.isSubmitted = true;
    const user: User = { ...this.registrationForm.value };

    let roles: string[] = [];
    roles.push(user['role']);

    delete user['role'];
    user.roles = [...roles];

    this.httpService
      .register(user)
      .subscribe({
        next: () => {
          alert('Registration was successful');
          this.router.navigate(['']); // login page
        },
        error: (err) => {
          this.isSubmitted = false;
          err.error ? err = err.error : err;
          alert(JSON.stringify(err, null, 4));
        }
      });
  }

}
