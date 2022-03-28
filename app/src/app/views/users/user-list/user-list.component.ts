import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonForm } from 'src/app/models/button-form';
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
  selectedUsers: Array<User>;

  userSample: User;
  showDialog: boolean;

  header: string;
  primaryButton: ButtonForm;
  secondaryButton: ButtonForm;
  panelClass: string;


  constructor(private usersService: UsersService, private messageService: MessageService, private confirmationService: ConfirmationService) {
    this.userSample = { name: "", email: "", password: "", surname: "" };
    this.showDialog = false;

    this.page = 1;
    this.limit = 10;
    this.header = "Create New User";
    this.primaryButton = { hide: false, label: "Create" }
    this.secondaryButton = { hide: true, label: "Login" }
    this.panelClass = "center-relative";

    this.users = [];
    this.selectedUsers = [];
    this.getUsers();
  }

  ngOnInit(): void {
  }

  getUsers() {
    this.usersService.listUsers(this.page, this.limit).then(res => {
      if (!res || res?.status !== 200 || res?.data?.error) {
        const summary = res?.data?.data ?? "Unknown error";
        const detail = res?.data?.message ?? "There has been an unknown error";
        this.messageService.add({ severity: "error", summary, detail });
      }
      this.users = res && res?.data && !res?.data?.error ? res?.data?.data?.users.docs : [];
    })
  }

  async submit(createUserForm: FormGroup) {

    const isUpdating = createUserForm.get("update")?.value;
    const { data, status } = isUpdating ?
      await this.usersService.updateUser(createUserForm.value) :
      await this.usersService.createUser(createUserForm.value);

    if (status !== 200 || data?.error) {
      const summary = data?.data ?? "Unknown error";
      const detail = data?.message ?? "There has been an unknown error";
      this.messageService.add({ severity: "error", summary, detail })
      return;
    }

    this.showDialog = false;
    this.messageService.add({
      severity: "success", summary: `User ${isUpdating ? "updated" : "created"}`,
      detail: `User ${createUserForm.get("name")?.value} successfully ${isUpdating ? "updated" : "created"}`
    });
    this.getUsers();
  }

  newUser() {
    this.header = "Create New User";
    this.primaryButton.label = "Create";
    this.usersService.updateUserForm(this.userSample);
    this.showDialog = true;
  }

  editUser(_user: User) {
    let user = { ..._user };
    this.header = "Update User";
    this.primaryButton.label = "Update";
    user.update = true;
    this.usersService.updateUserForm(user);
    this.showDialog = true;
  }

  deleteSelectedUsers() {
    const message = `Are you sure you want to delete the selected users?`;
    const accept = () => {
      this.usersService.deleteUsers(this.selectedUsers.map(u => u._id))
      this.getUsers();
      this.selectedUsers = [];
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Users Deleted', life: 3000 });
    }
    this.confirmationDialog(message, accept);
  }

  confirmationDialog(message: string, accept: Function) {
    this.confirmationService.confirm({
      message,
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept
    });
  }

  deleteUser(user: User) {
    const message = `Are you sure you want to delete the user '${user.name}'?`;
    const accept = () => {
      this.usersService.deleteUsers([user._id])
      this.getUsers();
      this.selectedUsers = [];
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'User Deleted', life: 3000 });
    }
    this.confirmationDialog(message, accept);
  }
}


