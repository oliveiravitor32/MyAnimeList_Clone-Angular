import { HttpParams } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import {
  combineLatestWith,
  debounceTime,
  distinctUntilChanged,
  filter,
  switchMap,
  take,
} from 'rxjs/operators';
import { IAllResponse } from '../../interfaces/all-response/all-response.interface';
import { ResponsiveMenuService } from '../../services/responsive-menu.service';
import { SearchService } from '../../services/search.service';
import { AnimesResponseDataList } from '../../types/animes-response-data-list';
import { CharactersResponseDataList } from '../../types/characters-response-data-list';
import { ClubsResponseDataList } from '../../types/clubs-response-data-list';
import { MangasResponseDataList } from '../../types/mangas-response-data-list';
import { PeoplesResponseDataList } from '../../types/peoples-response-data-list';
import { UsersResponseDataList } from '../../types/users-response-data-list';
import { convertCategoryToSearchMethodMap } from '../../utils/convert-category-to-search-method-map';
import { navbarLinkGroupsData } from '../../utils/navbar-link-groups-data';
import { CategoryTypeEnum } from './../../enums/categoy-type.enum';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit, OnDestroy {
  animesDataList: AnimesResponseDataList = [];
  mangasDataList: MangasResponseDataList = [];
  charactersDataList: CharactersResponseDataList = [];
  clubsDataList: ClubsResponseDataList = [];
  peoplesDataList: PeoplesResponseDataList = [];
  usersDataList: UsersResponseDataList = [];

  textInputSubscription: Subscription | null | undefined = null;
  selectInputSubscription: Subscription | null | undefined = null;

  isDropdownLinksOpen$: Observable<boolean> | null = null;
  isSearchBarOpen$: Observable<boolean> | null = null;

  isSearching: boolean = false;

  searchForm = new FormGroup({
    category: new FormControl(CategoryTypeEnum.ANIME),
    text: new FormControl('', Validators.required),
  });

  isDropdownLinkOpen: boolean = true;
  isSearchBarOpen: boolean = true;

  // Clean property for template usage of signals
  get isSearchBarVisible(): boolean {
    return (
      this._reponsiveMenuService.isSearchBarOpen() ||
      this._reponsiveMenuService.isDesktopView()
    );
  }

  get isDropdownLinksVisible(): boolean {
    return (
      this._reponsiveMenuService.isDropdownLinksOpen() ||
      this._reponsiveMenuService.isDesktopView()
    );
  }

  get linkGroupsList() {
    return navbarLinkGroupsData;
  }

  constructor(
    private readonly _searchService: SearchService,
    public readonly _reponsiveMenuService: ResponsiveMenuService
  ) {}

  ngOnInit(): void {
    this.watchInputsChangesAndSearch();
  }

  private watchInputsChangesAndSearch() {
    // Use the util convert method to get the search method specific for each category
    const categoryMethodMap = convertCategoryToSearchMethodMap(
      this._searchService
    );

    this.textInputSubscription = this.searchForm
      .get('text')
      ?.valueChanges.pipe(
        combineLatestWith(this.searchForm.get('category')!.valueChanges), // Combine with category select input observable
        debounceTime(300), // Wait for user to stop typing
        distinctUntilChanged(), // Only emit if value is different from previous value
        filter(([textValue]) => {
          // Clears last request cache when user clears search bar
          if (textValue && textValue.length === 0) {
            this.clearData();
          }

          return textValue !== null && textValue.trim().length > 0;
        }),
        // Cancel previous request if new request is made and take only the first response
        switchMap(([textValue, categoryValue]) => {
          // Set loading state to true when a new search is made
          this.isSearching = true;

          // Get the correct category based on the select input value
          const category = categoryValue as CategoryTypeEnum;

          let additionalParams: HttpParams = new HttpParams();

          // Set additional params for pagination if the category is not USERS
          if (category !== CategoryTypeEnum.USERS) {
            additionalParams.set('page', '1').set('limit', '10');
          }

          const searchMethod = categoryMethodMap[category];
          return searchMethod(textValue!, additionalParams).pipe(take(1));
        })
      )
      .subscribe({
        next: (results) => {
          // Clear previous data when a new search is completed
          this.clearData();

          // Set loading state to false when a search is completed
          this.isSearching = false;

          // Handle the search results putting the response data in the correct list
          this.handleSearchResults(results);
        },
        error: (error) => {
          // When an error occurs clear all data and stop searching
          this.clearData();
          this.isSearching = false;
        },
      });

    // Set default search values to start the operator combineLatestWith
    this.searchForm.get('text')?.setValue('');
    this.searchForm.get('category')?.setValue(CategoryTypeEnum.ANIME);
  }

  onFormSubmit() {
    // TODO: Implement the navigation to the search page
  }

  handleSearchResults(results: IAllResponse): void {
    if (!results || !results.data) return;

    const category = this.searchForm.get('category')?.value as CategoryTypeEnum;
    const responseData = results.data;

    // Use a data dispatcher object instead of a switch statement
    const dataDispatcher = {
      [CategoryTypeEnum.ANIME]: () =>
        (this.animesDataList = responseData as AnimesResponseDataList),
      [CategoryTypeEnum.MANGA]: () =>
        (this.mangasDataList = responseData as MangasResponseDataList),
      [CategoryTypeEnum.CHARACTERS]: () =>
        (this.charactersDataList = responseData as CharactersResponseDataList),
      [CategoryTypeEnum.CLUBS]: () =>
        (this.clubsDataList = responseData as ClubsResponseDataList),
      [CategoryTypeEnum.PEOPLE]: () =>
        (this.peoplesDataList = responseData as PeoplesResponseDataList),
      [CategoryTypeEnum.USERS]: () =>
        (this.usersDataList = responseData as UsersResponseDataList),
    };

    // Execute the appropriate handler or default to ALL
    dataDispatcher[category]();
  }

  clearData() {
    this.animesDataList = [];
    this.mangasDataList = [];
    this.charactersDataList = [];
    this.clubsDataList = [];
    this.peoplesDataList = [];
    this.usersDataList = [];
  }

  ngOnDestroy(): void {
    // Unsubscribe from the search subscription to avoid memory leaks
    if (this.textInputSubscription) {
      this.textInputSubscription.unsubscribe();
    }
  }
}
