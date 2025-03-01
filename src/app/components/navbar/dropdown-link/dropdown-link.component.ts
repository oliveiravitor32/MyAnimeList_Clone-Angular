import { Component, Input } from '@angular/core';
import { ILinkGroup } from '../../../interfaces/link/link-group.interface';

@Component({
  selector: 'app-dropdown-link',
  templateUrl: './dropdown-link.component.html',
  styleUrl: './dropdown-link.component.css',
})
export class DropdownLinkComponent {
  @Input({ required: true }) linkGroup: ILinkGroup = {
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
