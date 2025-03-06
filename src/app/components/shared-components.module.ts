import { CommonModule, NgOptimizedImage } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UtcDatePipe } from '../pipes/utc-date.pipe';
import { AnimeListItemComponent } from './anime-list-item/anime-list-item.component';
import { BannerComponent } from './banner/banner.component';
import { CharacterListItemComponent } from './character-list-item/character-list-item.component';
import { ClubListItemComponent } from './club-list-item/club-list-item.component';
import { FooterModule } from './footer/footer.module';
import { HeaderComponent } from './header/header.component';
import { MangaListItemComponent } from './manga-list-item/manga-list-item.component';
import { DropdownLinkComponent } from './navbar/dropdown-link/dropdown-link.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SearchBarComponent } from './navbar/search-bar/search-bar.component';
import { SearchResultsComponent } from './navbar/search-bar/search-results/search-results.component';
import { PeopleListItemComponent } from './people-list-item/people-list-item.component';
import { UserListItemComponent } from './user-list-item/user-list-item.component';

@NgModule({
  declarations: [
    HeaderComponent,
    BannerComponent,
    NavbarComponent,
    DropdownLinkComponent,
    AnimeListItemComponent,
    SearchBarComponent,
    SearchResultsComponent,
    MangaListItemComponent,
    ClubListItemComponent,
    UserListItemComponent,
    PeopleListItemComponent,
    CharacterListItemComponent,
    UtcDatePipe,
  ],
  imports: [
    CommonModule,
    FooterModule,
    NgOptimizedImage,
    ReactiveFormsModule,
    FontAwesomeModule,
  ],
  exports: [
    HeaderComponent,
    BannerComponent,
    NavbarComponent,
    AnimeListItemComponent,
    MangaListItemComponent,
    ClubListItemComponent,
    UserListItemComponent,
    PeopleListItemComponent,
    CharacterListItemComponent,
  ],
})
export class SharedComponentsModule {}
