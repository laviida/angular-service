import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { UserListComponent } from './views/users/user-list/user-list.component';

import { TableModule } from 'primeng/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { DialogModule } from 'primeng/dialog';

import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { PanelModule } from 'primeng/panel';
import { LoginComponent } from './views/auth/login/login.component';
import { DividerModule } from "primeng/divider";
import { PasswordModule } from 'primeng/password';
import { ServicesModule } from './services/services.module';
import { RegisterComponent } from './views/auth/register/register.component';
import { CreateUserFormComponent } from './common/create-user-form/create-user-form.component';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    LoginComponent,
    RegisterComponent,
    CreateUserFormComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    ToolbarModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    InputNumberModule,
    RadioButtonModule,
    InputTextareaModule,
    AppRoutingModule,
    PanelModule,
    DividerModule,
    PasswordModule,
    ServicesModule,
    ToastModule,
    ConfirmDialogModule
  ],
  providers: [MessageService, ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
