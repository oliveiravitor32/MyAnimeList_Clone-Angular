import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DropdownLinkComponent } from './dropdown-link/dropdown-link.component';
import { NavbarComponent } from './navbar.component';

import { SearchBarModule } from './search-bar/search-bar.module';

@NgModule({
  declarations: [NavbarComponent, DropdownLinkComponent],
  imports: [CommonModule, SearchBarModule],
  exports: [NavbarComponent],
})
export class NavbarModule {}
