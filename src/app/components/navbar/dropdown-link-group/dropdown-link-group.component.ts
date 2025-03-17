import { Component, effect, Input } from '@angular/core';
import { INavbarLinkGroup } from '../../../interfaces/navbar-links/navbar-link-group.interface';
import { ResponsiveMenuService } from '../../../services/responsive-menu.service';

@Component({
  selector: 'app-dropdown-link',
  templateUrl: './dropdown-link-group.component.html',
  styleUrl: './dropdown-link-group.component.css',
})
export class DropdownLinkGroupComponent {
  @Input({ required: true }) linkGroup: INavbarLinkGroup = {
    title: '',
    linksList: [],
  };

  isOpen = false;

  constructor(private readonly _responsiveMenuService: ResponsiveMenuService) {
    // Use effect to react on view changes and close dropdown links
    effect(() => {
      // This will run whenever isDesktopView signal updates
      _responsiveMenuService.isDesktopView();
      // Close dropdown when media query changes
      this.isOpen = false;
    });
  }

  get isDesktopView(): boolean {
    return this._responsiveMenuService.isDesktopView();
  }

  openDropdown() {
    this.isOpen = true;
  }

  closeDropdown() {
    this.isOpen = false;
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }
}
