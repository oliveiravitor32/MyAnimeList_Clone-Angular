import { Component } from '@angular/core';
import { faBars, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { ResponsiveMenuService } from '../../services/responsive-menu.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  hamburgerMenuIcon = faBars;
  searchIcon = faMagnifyingGlass;

  constructor(private readonly _responsiveMenuService: ResponsiveMenuService) {}

  toggleDropdownLinks() {
    this._responsiveMenuService.toggleDropdownLinks();
  }
  toggleSearchBar() {
    this._responsiveMenuService.toggleSearchBar();
  }
}
