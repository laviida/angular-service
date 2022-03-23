import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  constructor() { }
  users = [{ name: "afssaf", surname: "aawww", password: "afssaf", email: "aaa@ee.com" }]
  ngOnInit(): void {
  }

}
