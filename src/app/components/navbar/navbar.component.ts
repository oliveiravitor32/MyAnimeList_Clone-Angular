import { HttpParams } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  pairwise,
  switchMap,
  take,
} from 'rxjs/operators';
import { IAllResponse } from '../../interfaces/all-response/all-response.interface';
import { ICharactersResponseData } from '../../interfaces/characters-response/characters-response-data.interface';
import { IClubsResponseData } from '../../interfaces/clubs-response/clubs-response-data.interface';
import { IMangasResponseData } from '../../interfaces/mangas-reponse/mangas-response-data.interface';
import { IPeoplesResponseData } from '../../interfaces/peoples-response/peoples-response-data.interface';
import { IUsersResponseData } from '../../interfaces/users-response/users-response-data.interface';
import { SearchService } from '../../services/search.service';
import { AllResponseDataList } from '../../types/all-response-data-list';
import { AnimesResponseDataList } from '../../types/animes-response-data-list';
import { CharactersResponseDataList } from '../../types/characters-response-data-list';
import { ClubsResponseDataList } from '../../types/clubs-response-data-list';
import { MangasResponseDataList } from '../../types/mangas-response-data-list';
import { PeoplesResponseDataList } from '../../types/peoples-response-data-list';
import { UsersResponseDataList } from '../../types/users-response-data-list';
import { convertCategoryToSearchMethodMap } from '../../utils/convert-category-to-search-method-map';
import { navbarLinkGroupsData } from '../../utils/navbar-link-groups-data';
import { CategoryTypeEnum } from './../../enums/categoy-type.enum';
import { IAnimesResponseData } from './../../interfaces/animes-response/animes-response-data.interface';

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

  searchSubscription: Subscription | null | undefined = null;

  isSearching: boolean = false;

  searchForm = new FormGroup({
    category: new FormControl(CategoryTypeEnum.ALL),
    text: new FormControl('', Validators.required),
  });

  get linkGroupsList() {
    return navbarLinkGroupsData;
  }

  constructor(private readonly _searchService: SearchService) {}

  ngOnInit(): void {
    this.watchTextInputAndSearch();

    this.searchForm.get('text')?.setValue('hunter');
  }

  watchTextInputAndSearch() {
    // Use the util convert method to get the search method specific for each category
    const categoryMethodMap = convertCategoryToSearchMethodMap(
      this._searchService
    );

    this.searchSubscription = this.searchForm
      .get('text')
      ?.valueChanges.pipe(
        debounceTime(300), // Wait for 300ms pause in events
        distinctUntilChanged(), // Only emit if value is different from previous value
        pairwise(), // Emit the previous and current values as a tuple
        filter(([prevValue, currValue]) => {
          // Clears last request cache when user clears search bar
          if (
            currValue?.length === 0 &&
            prevValue?.length &&
            prevValue.length > 0
          ) {
            this.clearData();
          }

          return currValue !== null && currValue.trim().length > 0;
        }),
        switchMap(([prevQuery, currQuery]) => {
          // Set loading state to true when a new search is made
          this.isSearching = true;

          // Get the correct category based on the select input value
          const category = this.searchForm.get('category')
            ?.value as CategoryTypeEnum;

          const additionalParams = new HttpParams()
            .set('page', '1')
            .set('limit', '10');

          const searchMethod = categoryMethodMap[category];
          return searchMethod(currQuery!, additionalParams).pipe(take(1));
        }) // Cancel previous request if new request is made and take only the first response
      )
      .subscribe((results) => {
        // Clear previous data when a new search is completed
        this.clearData();

        // Set loading state to false when a search is completed
        this.isSearching = false;

        // Handle the search results putting the response data in the correct list
        this.handleSearchResults(results);
      });
  }

  onFormSubmit() {
    // TODO: Implement the navigation to the search page
  }

  handleSearchResults(results: IAllResponse): void {
    if (!results || !results.data) return;

    const category = this.searchForm.get('category')?.value as CategoryTypeEnum;
    const responseData = results.data;

    console.log(responseData);
    console.log('category');
    console.log(category);

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
      [CategoryTypeEnum.ALL]: () => this.handleAllCategoryResults(responseData),
    };

    // Execute the appropriate handler or default to ALL
    (dataDispatcher[category] || dataDispatcher[CategoryTypeEnum.ALL])();
  }

  handleAllCategoryResults(results: AllResponseDataList) {
    if (!Array.isArray(results) || results.length === 0) {
      return;
    }

    // Create arrays for batch processing (better performance than individual pushes)
    const animes: AnimesResponseDataList = [];
    const mangas: MangasResponseDataList = [];
    const characters: CharactersResponseDataList = [];
    const clubs: ClubsResponseDataList = [];
    const peoples: PeoplesResponseDataList = [];
    const users: UsersResponseDataList = [];

    // Single pass through results - O(n) complexity
    for (const item of results) {
      // Fast type identification with property checks
      // Order checks from most common to least common for performance
      if (this.hasAnimeProperties(item)) {
        animes.push(item as IAnimesResponseData);
      } else if (this.hasMangaProperties(item)) {
        mangas.push(item as IMangasResponseData);
      } else if (this.hasCharacterProperties(item)) {
        characters.push(item as ICharactersResponseData);
      } else if (this.hasClubProperties(item)) {
        clubs.push(item as IClubsResponseData);
      } else if (this.hasPeopleProperties(item)) {
        peoples.push(item as IPeoplesResponseData);
      } else if (this.hasUserProperties(item)) {
        users.push(item as IUsersResponseData);
      }
    }
  }

  /**
   * Type guard for anime data
   * @param item - Any object to check
   * @returns Type assertion that item is IAnimesResponseData
   */
  private hasAnimeProperties(item: any): item is IAnimesResponseData {
    return Boolean(
      item &&
        'type' in item &&
        typeof item.type === 'string' &&
        ['TV', 'Movie', 'OVA', 'Special', 'ONA', 'Music'].includes(item.type) &&
        ('episodes' in item || 'aired' in item)
    );
  }

  /**
   * Type guard for manga data
   * @param item - Any object to check
   * @returns Type assertion that item is IMangasResponseData
   */
  private hasMangaProperties(item: any): item is IMangasResponseData {
    return Boolean(
      item &&
        'type' in item &&
        typeof item.type === 'string' &&
        [
          'Manga',
          'Novel',
          'Light Novel',
          'One-shot',
          'Doujinshi',
          'Manhwa',
          'Manhua',
        ].includes(item.type) &&
        ('chapters' in item || 'volumes' in item)
    );
  }

  /**
   * Type guard for character data
   * @param item - Any object to check
   * @returns Type assertion that item is ICharactersResponseData
   */
  private hasCharacterProperties(item: any): item is ICharactersResponseData {
    return Boolean(
      item &&
        ('nicknames' in item || 'about' in item) &&
        'name' in item &&
        !('episodes' in item) &&
        !('chapters' in item)
    );
  }

  /**
   * Type guard for club data
   * @param item - Any object to check
   * @returns Type assertion that item is IClubsResponseData
   */
  private hasClubProperties(item: any): item is IClubsResponseData {
    return Boolean(
      item && 'members' in item && 'category' in item && 'access' in item
    );
  }

  /**
   * Type guard for people data
   * @param item - Any object to check
   * @returns Type assertion that item is IPeoplesResponseData
   */
  private hasPeopleProperties(item: any): item is IPeoplesResponseData {
    return Boolean(
      item &&
        ('birthday' in item || 'family_name' in item) &&
        'favorites' in item &&
        !('episodes' in item) &&
        !('chapters' in item)
    );
  }

  /**
   * Type guard for user data
   * @param item - Any object to check
   * @returns Type assertion that item is IUsersResponseData
   */
  private hasUserProperties(item: any): item is IUsersResponseData {
    return Boolean(
      item && 'username' in item && !('mal_id' in item) && 'last_online' in item
    );
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
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
  }
}
