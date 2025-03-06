import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { AnimesResponseDataList } from '../../../../types/animes-response-data-list';
import { CharactersResponseDataList } from '../../../../types/characters-response-data-list';
import { ClubsResponseDataList } from '../../../../types/clubs-response-data-list';
import { MangasResponseDataList } from '../../../../types/mangas-response-data-list';
import { PeoplesResponseDataList } from '../../../../types/peoples-response-data-list';
import { UsersResponseDataList } from '../../../../types/users-response-data-list';

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

  spinnerIcon = faSpinner;
}
