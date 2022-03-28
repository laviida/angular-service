import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user-list/user-list.component';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { PanelModule } from 'primeng/panel';
import { PasswordModule } from 'primeng/password';
import { ServicesModule } from 'src/app/services/services.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonAllModule } from 'src/app/common/common-all.module';



@NgModule({
  declarations: [UserListComponent],
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
export class UsersModule { }
