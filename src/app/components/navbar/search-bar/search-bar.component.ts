import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { faMagnifyingGlass, faTimes } from '@fortawesome/free-solid-svg-icons';
import { AnimesResponseDataList } from '../../../types/animes-response-data-list';
import { CharactersResponseDataList } from '../../../types/characters-response-data-list';
import { ClubsResponseDataList } from '../../../types/clubs-response-data-list';
import { MangasResponseDataList } from '../../../types/mangas-response-data-list';
import { PeoplesResponseDataList } from '../../../types/peoples-response-data-list';
import { UsersResponseDataList } from '../../../types/users-response-data-list';
import { categoryTypeArray } from '../../../utils/category-type-description-map';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css',
})
export class SearchBarComponent {
  // Close input on escape key press
  @HostListener('document:keydown.escape')
  closeOnEscape(): void {
    this.closeSearchBar();
    this.searchInputEl?.nativeElement?.blur();
  }

  @Input({ required: true }) searchForm!: FormGroup;
  @Input({ required: true }) isSearching: boolean = false;

  @Input({ required: true }) animesDataList: AnimesResponseDataList = [];
  @Input({ required: true }) mangasDataList: MangasResponseDataList = [];
  @Input({ required: true }) charactersDataList: CharactersResponseDataList =
    [];
  @Input({ required: true }) clubsDataList: ClubsResponseDataList = [];
  @Input({ required: true }) peoplesDataList: PeoplesResponseDataList = [];
  @Input({ required: true }) usersDataList: UsersResponseDataList = [];

  @Output('onFormSubmit') onFormSubmitEmitt = new EventEmitter<void>();

  @ViewChild('searchTextInput') searchInputEl!: ElementRef<HTMLInputElement>;

  searchIcon = faMagnifyingGlass;
  closeIcon = faTimes;

  showResultsOnTextInputFocus = false;
  isSearchBarOpen: boolean = false;

  closeSearchBar() {
    this.isSearchBarOpen = false;
  }

  get categoryTypeArray() {
    return categoryTypeArray;
  }

  get searchedText() {
    return this.searchForm.get('text')?.value;
  }

  onSearchTextInputFocus() {
    this.isSearchBarOpen = true;
  }

  onSearchTextInputBlur() {
    this.showResultsOnTextInputFocus = false;
  }

  clearSearch() {
    this.searchForm.get('text')!.reset();
  }

  onSubmit() {
    // TODO
  }
}
