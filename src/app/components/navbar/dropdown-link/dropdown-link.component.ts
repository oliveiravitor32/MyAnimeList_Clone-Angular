import { Component, Input } from '@angular/core';
import { INavbarLinkGroup } from '../../../interfaces/navbar-links/navbar-link-group.interface';

@Component({
  selector: 'app-dropdown-link',
  templateUrl: './dropdown-link.component.html',
  styleUrl: './dropdown-link.component.css',
})
export class DropdownLinkComponent {
  @Input({ required: true }) linkGroup: INavbarLinkGroup = {
    title: '',
    linksList: [],
  };

  isOpen = false;

  openDropdown() {
    this.isOpen = true;
  }

  closeDropdown() {
    this.isOpen = false;
  }
}
