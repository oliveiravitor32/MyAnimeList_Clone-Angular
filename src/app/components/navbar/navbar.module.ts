import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar.component';
import { DropdownLinkComponent } from './dropdown-link/dropdown-link.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { SearchBarComponent } from './search-bar/search-bar.component';

@NgModule({
  declarations: [NavbarComponent, DropdownLinkComponent, SearchBarComponent],
  imports: [CommonModule, FontAwesomeModule, ReactiveFormsModule],
  exports: [NavbarComponent],
})
export class NavbarModule {}
