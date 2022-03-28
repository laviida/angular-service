import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss']
})
export class MenuBarComponent implements OnInit {


  items: MenuItem[];
  username: string;

  constructor(private authService: AuthService, private router: Router) {
    this.items = [];
    this.username = this.authService.getUser().name;
  }

  ngOnInit() {
    this.items = [
      {
        label: 'Users',
        icon: 'pi pi-fw pi-users',
        routerLink: "/users"
      }
    ];
  }

  logOut() {
    this.authService.logOut();
    this.router.navigate(["/login"]);
  }
}