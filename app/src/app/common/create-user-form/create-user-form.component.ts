import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ButtonForm } from 'src/app/models/button-form';
import { User } from 'src/app/models/user';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-create-user-form',
  templateUrl: './create-user-form.component.html',
  styleUrls: ['./create-user-form.component.scss']
})
export class CreateUserFormComponent {

  subscription: Subscription;
  submitIsLoading: boolean;
  createUserForm: FormGroup;
  user: User;

  @Input() header: string;
  @Input() primaryButton: ButtonForm;
  @Input() secondaryButton: ButtonForm;
  @Input() panelClass: string;

  @Output() submitUserForm;
  @Output() clickSecondaryButton;


  constructor(private usersService: UsersService) {
    this.subscription = new Subscription();
    this.user = { name: "", email: "", password: "", surname: "" };

    this.createUserForm = new FormGroup({
      name: new FormControl(this.user.name, [Validators.required, Validators.minLength(4)]),
      surname: new FormControl(this.user.surname, [Validators.required, Validators.minLength(4)]),
      email: new FormControl(this.user.email, [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]),
      update: new FormControl(this.user.update),
      _id: new FormControl(this.user._id)
    });

    this.usersService.notifyForm.subscribe((user) => {
      this.user = user;
      this.user.password = "";
      if (this.user.update) {
        this.createUserForm.get('password')?.setValidators([Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]);
        this.createUserForm.get('password')?.updateValueAndValidity();
      }
      this.createUserForm.patchValue(this.user);
    });
    this.submitIsLoading = false;
    this.submitUserForm = new EventEmitter<FormGroup>();
    this.clickSecondaryButton = new EventEmitter<FormGroup>();

    this.header = "";
    this.primaryButton = { hide: true, label: "" }
    this.secondaryButton = { hide: true, label: "" }
    this.panelClass = "center";
  }

  async onSubmit() {
    if (!this.createUserForm.valid) return
    this.submitIsLoading = true;
    try {

      this.submitUserForm.emit(this.createUserForm);
      this.submitIsLoading = false;

    } catch (error) {
      this.submitIsLoading = false;
    } finally {
      this.submitIsLoading = false;
    }
  }

  clickSButton() {
    this.clickSecondaryButton.emit();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
