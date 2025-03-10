import { CommonModule, DatePipe, NgOptimizedImage } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UtcDatePipe } from '../pipes/utc-date.pipe';

import { BannerComponent } from './banner/banner.component';
import { FooterModule } from './footer/footer.module';
import { HeaderComponent } from './header/header.component';
import { ItemsListComponent } from './items-list/items-list.component';
import { ListItemComponent } from './items-list/list-item/list-item.component';
import { DropdownLinkComponent } from './navbar/dropdown-link/dropdown-link.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SearchBarComponent } from './navbar/search-bar/search-bar.component';
import { SearchResultsComponent } from './navbar/search-bar/search-results/search-results.component';

@NgModule({
  declarations: [
    HeaderComponent,
    BannerComponent,
    NavbarComponent,
    DropdownLinkComponent,
    SearchBarComponent,
    SearchResultsComponent,
    ItemsListComponent,
    ListItemComponent,
    UtcDatePipe,
  ],
  imports: [
    CommonModule,
    FooterModule,
    NgOptimizedImage,
    ReactiveFormsModule,
    FontAwesomeModule,
  ],
  providers: [DatePipe],
  exports: [HeaderComponent, BannerComponent, NavbarComponent],
})
export class SharedComponentsModule {}
