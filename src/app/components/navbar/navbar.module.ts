import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar.component';
import { DropdownLinkComponent } from './dropdown-link/dropdown-link.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [NavbarComponent, DropdownLinkComponent],
  imports: [CommonModule, FontAwesomeModule, FormsModule],
  exports: [NavbarComponent],
})
export class NavbarModule {}
