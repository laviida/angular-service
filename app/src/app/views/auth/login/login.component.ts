import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  submitIsLoading: boolean;
  loginForm: FormGroup;
  emailValid: any;

  constructor(private authService: AuthService, private router: Router) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]),

    });
    this.submitIsLoading = false;
    this.emailValid = true;
  }

  ngOnInit(): void {
  }

  async onSubmit() {
    if (!this.loginForm.valid) return
    this.submitIsLoading = true;
    try {
      const { data: { error, data }, status } = await this.authService.login(this.loginForm.get("email")?.value, this.loginForm.get("password")?.value)
      if (error) return;

      this.authService.setUserLogin(data.token);

      this.router.navigate(['/users']);
    } catch (error) {
      this.submitIsLoading = false;
    } finally {
      this.submitIsLoading = false;
    }
  }

  register() {
    this.router.navigate(['/register']);
  }



}