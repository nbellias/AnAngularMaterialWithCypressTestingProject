import {Component, inject} from '@angular/core';
import {MatAnchor, MatButton} from "@angular/material/button";
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle} from '@angular/material/card';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatError, MatFormField, MatInput, MatLabel, MatSuffix} from '@angular/material/input';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatIcon} from '@angular/material/icon';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [
    MatAnchor,
    RouterLink,
    RouterLinkActive,
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatCardTitle,
    MatCardSubtitle,
    ReactiveFormsModule,
    MatError,
    MatFormField,
    MatFormField,
    MatInput,
    MatLabel,
    MatSuffix,
    MatButton,
    MatFormField,
    MatIcon
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private readonly authService = inject(AuthService);
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  error = '';

  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly snackBar: MatSnackBar
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.login();
    }
  }

  onCancel(): void {
    this.router.navigate(['/']);
  }

  onReset(): void {
    this.loginForm.reset();
    this.error = '';
    this.loading = false;
    this.submitted = false;
    this.snackBar.open('Form reset', 'Close', {
      duration: 2000
    });
  }

  login() {
    this.submitted = true;

    // Stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.error = '';
    this.loading = true;
    const { username, password } = this.loginForm.value;
    this.authService.login(username, password)
      .subscribe({
        next: (user) => {
          // Check if user is admin
          if (user.roles.includes('admin')) {
            this.router.navigate(['/dashboarda']);
          } else {
            this.router.navigate(['/dashboard']);
          }
        },
        error: (error) => {
          const errorMessage = error.error?.message || 'Login failed';
          this.error = 'Login failed. Please check your credentials.' + errorMessage;
          this.loading = false;
        }
      });

  }
}
