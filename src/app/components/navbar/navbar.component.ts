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
import { SearchService } from '../../services/search.service';
import { AnimesResponseDataList } from '../../types/animes-response-data-list';
import { convertCategoryToSearchMethodMap } from '../../utils/convert-category-to-search-method-map';
import { navbarLinkGroupsData } from '../../utils/navbar-link-groups-data';
import { CategoryTypeEnum } from './../../enums/categoy-type.enum';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit, OnDestroy {
  searchedData: AnimesResponseDataList = [];

  searchSubscription: Subscription | null | undefined = null;

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
  }
  watchTextInputAndSearch() {
    // Use the util convert method to get the search method for each category
    const categoryMethodMap = convertCategoryToSearchMethodMap(
      this._searchService
    );

    this.searchSubscription = this.searchForm
      .get('text')
      ?.valueChanges.pipe(
        debounceTime(300), // Wait for 400ms pause in events
        distinctUntilChanged(), // Only emit if value is different from previous value
        pairwise(), // Emit the previous and current values as a tuple
        filter(([prevQuery, currQuery]) => {
          // Clears last request cache when user clears search bar
          if (
            currQuery?.length === 0 &&
            prevQuery?.length &&
            prevQuery.length > 0
          ) {
            console.log('Clearing search data');
            this.searchedData = [];
          }

          return currQuery !== null && currQuery.trim().length > 0;
        }), // Filter out empty values
        switchMap(([prevQuery, currQuery]) => {
          const category = this.searchForm.get('category')
            ?.value as CategoryTypeEnum;

          const additionalParams = new HttpParams()
            .set('order_by', 'popularity')
            .set('page', '1')
            .set('limit', '10');

          const searchMethod = categoryMethodMap[category];
          return searchMethod(currQuery!, additionalParams).pipe(take(1));
        }) // Cancel previous request if new request is made and take only the first response
      )
      .subscribe((results) => {
        this.searchedData = results.data;
        console.log(results.data);
      });
    this.searchForm.get('text')?.setValue('hunter');
  }

  onFormSubmit() {
    // TODO: Implement the navigation to the search page
  }

  ngOnDestroy(): void {
    // Unsubscribe from the search subscription to avoid memory leaks
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
  }
}
