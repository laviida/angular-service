import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  users = [{ name: "afssaf", surname: "aawww", password: "afssaf", email: "aaa@ee.com" }]

  newUser: User;
  showDialog: boolean;
  userForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.newUser = { name: "", email: "", password: "", surname: "" };
    this.showDialog = false;
    this.userForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, /*LoginValidator.regex*/]],
      name: ['', [Validators.required]],
      surname: ['', [Validators.required]],
    });
  }
  ngOnInit(): void {

  }

  showHideDialog(showHide: boolean) {
    this.showDialog = showHide;
    // this.submitted = false;
    // this.productDialog = true;
  }

  createUser() {
    // this.submitted = true;

    // if (this.product.name.trim()) {
    //     if (this.product.id) {
    //         this.products[this.findIndexById(this.product.id)] = this.product;                
    //         this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Updated', life: 3000});
    //     }
    //     else {
    //         this.product.id = this.createId();
    //         this.product.image = 'product-placeholder.svg';
    //         this.products.push(this.product);
    //         this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Created', life: 3000});
    //     }

    //     this.products = [...this.products];
    //     this.productDialog = false;
    //     this.product = {};
  }

}

