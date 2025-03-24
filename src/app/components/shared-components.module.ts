import { CommonModule, DatePipe, NgOptimizedImage } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { SharedPipesModule } from '../shared/shared-pipes/shared-pipes.module';
import { BannerComponent } from './banner/banner.component';
import { AboutUsComponent } from './footer/about-us/about-us.component';
import { FooterComponent } from './footer/footer.component';
import { TopLinksRankingComponent } from './footer/top-links-ranking/top-links-ranking.component';
import { HeaderComponent } from './header/header.component';
import { AnimeListItemComponent } from './items-list/anime-list-item/anime-list-item.component';
import { CharacterListItemComponent } from './items-list/character-list-item/character-list-item.component';
import { ClubListItemComponent } from './items-list/club-list-item/club-list-item.component';
import { ItemsListComponent } from './items-list/items-list.component';
import { MangaListItemComponent } from './items-list/manga-list-item/manga-list-item.component';
import { PeopleListItemComponent } from './items-list/people-list-item/people-list-item.component';
import { UserListItemComponent } from './items-list/user-list-item/user-list-item.component';
import { LoginButtonComponent } from './login-button/login-button.component';
import { DropdownLinkGroupComponent } from './navbar/dropdown-link-group/dropdown-link-group.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SearchBarComponent } from './navbar/search-bar/search-bar.component';
import { SearchResultsComponent } from './navbar/search-bar/search-results/search-results.component';
import { SignUpButtonComponent } from './sign-up-button/sign-up-button.component';
import { NavigationLinksComponent } from './footer/navigation-links/navigation-links.component';
import { SocialMediaLinksComponent } from './footer/social-media-links/social-media-links.component';

@NgModule({
  declarations: [
    HeaderComponent,
    BannerComponent,
    NavbarComponent,
    DropdownLinkGroupComponent,
    SearchBarComponent,
    SearchResultsComponent,
    ItemsListComponent,
    AnimeListItemComponent,
    MangaListItemComponent,
    CharacterListItemComponent,
    ClubListItemComponent,
    UserListItemComponent,
    PeopleListItemComponent,
    SignUpButtonComponent,
    LoginButtonComponent,
    FooterComponent,
    AboutUsComponent,
    TopLinksRankingComponent,
    NavigationLinksComponent,
    SocialMediaLinksComponent,
  ],
  imports: [
    CommonModule,
    NgOptimizedImage,
    ReactiveFormsModule,
    FontAwesomeModule,
    SharedPipesModule,
  ],
  providers: [DatePipe],
  exports: [HeaderComponent, BannerComponent, NavbarComponent, FooterComponent],
})
export class SharedComponentsModule {}
