import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.sass'],
})
export class AuthFormComponent {
  public hide: boolean = true;
  public loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });
  public areInvalidCreds: boolean = false;

  constructor(private authService: AuthService, private router: Router) {
    this.loginForm.valueChanges.subscribe(() => {
      this.areInvalidCreds = false;
    });
  }

  public onSubmit(): void {
    const { email, password } = this.loginForm.value;
    this.authService.login(email, password).subscribe({
      next: () => {
        this.router.navigateByUrl('/');
      },
      error: (err: any) => {
        if (err.status === 401) {
          this.areInvalidCreds = true;
        }
      },
    });
  }
}
