import { CommonModule, DatePipe, NgOptimizedImage } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { SharedPipesModule } from '../shared/shared-pipes/shared-pipes.module';
import { BannerComponent } from './banner/banner.component';
import { FooterModule } from './footer/footer.module';
import { HeaderComponent } from './header/header.component';
import { AnimeListItemComponent } from './items-list/anime-list-item/anime-list-item.component';
import { CharacterListItemComponent } from './items-list/character-list-item/character-list-item.component';
import { ClubListItemComponent } from './items-list/club-list-item/club-list-item.component';
import { ItemsListComponent } from './items-list/items-list.component';
import { MangaListItemComponent } from './items-list/manga-list-item/manga-list-item.component';
import { PeopleListItemComponent } from './items-list/people-list-item/people-list-item.component';
import { UserListItemComponent } from './items-list/user-list-item/user-list-item.component';
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
    AnimeListItemComponent,
    MangaListItemComponent,
    CharacterListItemComponent,
    ClubListItemComponent,
    UserListItemComponent,
    PeopleListItemComponent,
  ],
  imports: [
    CommonModule,
    FooterModule,
    NgOptimizedImage,
    ReactiveFormsModule,
    FontAwesomeModule,
    SharedPipesModule,
  ],
  providers: [DatePipe],
  exports: [HeaderComponent, BannerComponent, NavbarComponent],
})
export class SharedComponentsModule {}
