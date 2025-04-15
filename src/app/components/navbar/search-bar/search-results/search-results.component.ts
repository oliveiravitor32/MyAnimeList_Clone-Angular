import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { AnimesResponseDataList } from '../../../../types/api-response-data-lists/animes-response-data-list';
import { CharactersResponseDataList } from '../../../../types/api-response-data-lists/characters-response-data-list';
import { ClubsResponseDataList } from '../../../../types/api-response-data-lists/clubs-response-data-list';
import { MangasResponseDataList } from '../../../../types/api-response-data-lists/mangas-response-data-list';
import { PeoplesResponseDataList } from '../../../../types/api-response-data-lists/peoples-response-data-list';
import { UsersResponseDataList } from '../../../../types/api-response-data-lists/users-response-data-list';
import { AnimeListItemComponent } from './../../../items-list/anime-list-item/anime-list-item.component';
import { CharacterListItemComponent } from './../../../items-list/character-list-item/character-list-item.component';
import { ClubListItemComponent } from './../../../items-list/club-list-item/club-list-item.component';
import { MangaListItemComponent } from './../../../items-list/manga-list-item/manga-list-item.component';
import { PeopleListItemComponent } from './../../../items-list/people-list-item/people-list-item.component';
import { UserListItemComponent } from './../../../items-list/user-list-item/user-list-item.component';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchResultsComponent {
  @Input({ required: true }) searchedText: string = '';
  @Input({ required: true }) isSearching: boolean = false;

  @Input({ required: true }) animesDataList: AnimesResponseDataList = [];
  @Input({ required: true }) mangasDataList: MangasResponseDataList = [];
  @Input({ required: true }) charactersDataList: CharactersResponseDataList =
    [];
  @Input({ required: true }) clubsDataList: ClubsResponseDataList = [];
  @Input({ required: true }) peoplesDataList: PeoplesResponseDataList = [];
  @Input({ required: true }) usersDataList: UsersResponseDataList = [];

  AnimeListItemComponent = AnimeListItemComponent;
  MangaListItemComponent = MangaListItemComponent;
  CharacterListItemComponent = CharacterListItemComponent;
  ClubListItemComponent = ClubListItemComponent;
  PeopleListItemComponent = PeopleListItemComponent;
  UserListItemComponent = UserListItemComponent;

  spinnerIcon = faSpinner;
}
