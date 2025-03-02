import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar.component';
import { DropdownLinkComponent } from './dropdown-link/dropdown-link.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [NavbarComponent, DropdownLinkComponent],
  imports: [CommonModule, FontAwesomeModule, ReactiveFormsModule],
  exports: [NavbarComponent],
})
export class NavbarModule {}
