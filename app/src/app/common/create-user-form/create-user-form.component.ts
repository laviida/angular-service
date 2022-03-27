import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonForm } from 'src/app/models/button-form';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-create-user-form',
  templateUrl: './create-user-form.component.html',
  styleUrls: ['./create-user-form.component.scss']
})
export class CreateUserFormComponent {


  submitIsLoading: boolean;
  createUserForm: FormGroup;

  @Input() header: string;
  @Input() primaryButton: ButtonForm;
  @Input() secondaryButton: ButtonForm;
  router: Router;

  constructor(private authService: AuthService, private _router: Router) {
    this.createUserForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(4)]),
      surname: new FormControl('', [Validators.required, Validators.minLength(4)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]),

    });
    this.submitIsLoading = false;

    this.header = "";
    this.primaryButton = { function: () => { }, hide: true, label: "" }
    this.secondaryButton = { function: () => { }, hide: true, label: "" }
    this.router = _router;
  }

  async onSubmit() {
    if (!this.createUserForm.valid) return
    this.submitIsLoading = true;
    try {
      const { data, status } = await this.authService.register(
        this.createUserForm.get("email")?.value,
        this.createUserForm.get("password")?.value,
        this.createUserForm.get("name")?.value,
        this.createUserForm.get("surname")?.value
      );

      this.primaryButton.function(data, status, this.router);

    } catch (error) {
      this.submitIsLoading = false;
    } finally {
      this.submitIsLoading = false;
    }
  }

}
