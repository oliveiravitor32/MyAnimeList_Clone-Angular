import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar.component';
import { DropdownLinkComponent } from './dropdown-link/dropdown-link.component';

@NgModule({
  declarations: [NavbarComponent, DropdownLinkComponent],
  imports: [CommonModule],
  exports: [NavbarComponent],
})
export class NavbarModule {}
