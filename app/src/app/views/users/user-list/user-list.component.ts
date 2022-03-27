import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  page: number;
  limit: number;
  users: Array<User>

  newUser: User;
  showDialog: boolean;
  userForm: FormGroup;

  header: string;

  constructor(private usersService: UsersService) {
    this.newUser = { name: "", email: "", password: "", surname: "" };
    this.showDialog = false;
    this.userForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]),
      name: new FormControl('', [Validators.required]),
      surname: new FormControl('', [Validators.required]),
    });

    this.page = 1;
    this.limit = 10;
    this.header = "";

    this.users = [];
    this.usersService.listUsers(this.page, this.limit).then(({ data: { data, error }, status }) => {
      this.users = !error ? data?.users.docs : [];
    })
  }

  ngOnInit(): void {

  }

  showHideDialog(showHide: boolean) {
    this.showDialog = showHide;
    // this.submitted = false;
    // this.productDialog = true;
  }

  createUser() {

  }

}


