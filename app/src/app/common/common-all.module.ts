import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateUserFormComponent } from './create-user-form/create-user-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { PanelModule } from 'primeng/panel';
import { PasswordModule } from 'primeng/password';
import { ServicesModule } from '../services/services.module';
import { MenuBarComponent } from './menu-bar/menu-bar.component';
import { MenubarModule } from 'primeng/menubar';


@NgModule({
  declarations: [CreateUserFormComponent, MenuBarComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ToolbarModule,
    ButtonModule,
    InputTextModule,
    InputNumberModule,
    PanelModule,
    PasswordModule,
    ServicesModule,
    MenubarModule
  ],
  exports: [CreateUserFormComponent, MenuBarComponent]
})
export class CommonAllModule { }
