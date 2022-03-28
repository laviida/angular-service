import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { PanelModule } from 'primeng/panel';
import { PasswordModule } from 'primeng/password';
import { ServicesModule } from 'src/app/services/services.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonAllModule } from 'src/app/common/common-all.module';



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent],
  imports: [
    CommonModule,
    CommonAllModule,
    TableModule,
    ToastModule,
    ConfirmDialogModule,
    ToolbarModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    InputNumberModule,
    PanelModule,
    PasswordModule,
    ServicesModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AuthModule { }




