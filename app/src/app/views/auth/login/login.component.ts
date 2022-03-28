import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  submitIsLoading: boolean;
  loginForm: FormGroup;
  emailValid: any;

  constructor(private authService: AuthService, private router: Router, private messageService: MessageService) {
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
      const { data, status } = await this.authService.login(this.loginForm.get("email")?.value, this.loginForm.get("password")?.value);

      if (status !== 200 || data?.error) {
        const summary = data?.data ?? "Unknown error";
        const detail = data?.message ?? "There has been an unknown error";
        this.messageService.add({ severity: "error", summary, detail })
        return;
      }

      this.submitIsLoading = false;
      this.authService.setUserLogin(data.data.token);
      this.router.navigate(['/users']);
    } catch (error: any) {
      this.messageService.add({ severity: "error", summary: error.name, detail: error.message })
      this.submitIsLoading = false;
    } finally {
      this.submitIsLoading = false;
    }
  }

  register() {
    this.router.navigate(['/register']);
  }

}