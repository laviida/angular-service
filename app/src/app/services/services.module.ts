import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth.service';
import { HttpClient } from './httpClient.service';
import { UsersService } from './users.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    AuthService,
    HttpClient,
    UsersService
  ]
})
export class ServicesModule { }
