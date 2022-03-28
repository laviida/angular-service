import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonForm } from 'src/app/models/button-form';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {


  header: string;
  primaryButton: ButtonForm;
  secondaryButton: ButtonForm;

  constructor(private authService: AuthService, private messageService: MessageService, private router: Router) {
    this.header = "Register";
    this.primaryButton = { hide: false, label: "Submit" }
    this.secondaryButton = { hide: false, label: "Login" }
  }

  async submit(createUserForm: FormGroup) {
    const { data, status } = await this.authService.register(
      createUserForm.get("email")?.value,
      createUserForm.get("password")?.value,
      createUserForm.get("name")?.value,
      createUserForm.get("surname")?.value
    );

    if (status !== 200 || data?.error) {
      const summary = data?.data ?? "Unknown error";
      const detail = data?.message ?? "There has been an unknown error";
      this.messageService.add({ severity: "error", summary, detail })
      return;
    }

    this.authService.setUserLogin(data.data.token);
    this.router.navigate(['/users']);
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }


}
