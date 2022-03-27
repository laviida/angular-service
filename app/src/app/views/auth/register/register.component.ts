import { Component } from '@angular/core';
import { Router } from '@angular/router';
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


  constructor(private authService: AuthService) {
    this.header = "Register";
    this.primaryButton = { hide: false, label: "Submit", function: this.submit }
    this.secondaryButton = { hide: false, label: "Login", function: this.goToLogin }
  }

  submit(data: any, status: number, router: Router) {
    this.authService.setUserLogin(data.token);
    router.navigate(['/users']);
  }

  goToLogin(router: Router) {
    console.log("fdsfafssafsa");
    router.navigate(['/login']);
  }


}
