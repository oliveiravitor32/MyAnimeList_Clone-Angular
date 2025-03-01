import { Component } from '@angular/core';
import { faBars, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  hamburgerMenuIcon = faBars;
  searchIcon = faMagnifyingGlass;
}
