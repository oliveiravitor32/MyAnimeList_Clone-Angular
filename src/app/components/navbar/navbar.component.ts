import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  switchMap,
  take,
} from 'rxjs/operators';
import { SearchService } from '../../services/search.service';
import { AnimesResponseDataList } from '../../types/animes-reponse-data-list';
import { convertCategoryToSearchMethodMap } from '../../utils/convert-category-to-search-method-map';
import { navbarLinkGroupsData } from '../../utils/navbar-link-groups-data';
import { CategoryTypeEnum } from './../../enums/categoy-type.enum';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  searchedData: AnimesResponseDataList = [];

  searchForm = new FormGroup({
    category: new FormControl(CategoryTypeEnum.ALL),
    text: new FormControl('', Validators.required),
  });

  get linkGroupsList() {
    return navbarLinkGroupsData;
  }

  constructor(private readonly _searchService: SearchService) {}

  ngOnInit(): void {
    // Use the util covert method to get the search method for each category
    const categoryMethodMap = convertCategoryToSearchMethodMap(
      this._searchService
    );

    this.searchForm
      .get('text')
      ?.valueChanges.pipe(
        debounceTime(400), // Wait for 400ms pause in events
        distinctUntilChanged(), // Only emit if value is different from previous value
        filter((query) => query !== null && query.trim().length > 0), // Filter out empty values
        switchMap((query) => {
          const category = this.searchForm.get('category')
            ?.value as CategoryTypeEnum;

          const additionalParams = new HttpParams()
            .set('order_by', 'popularity')
            .set('page', '1')
            .set('limit', '10');

          const searchMethod = categoryMethodMap[category];
          return searchMethod(query!, additionalParams).pipe(take(1));
        }) // Cancel previous request if new request is made and take only the first response
      )
      .subscribe((results) => {
        this.searchedData = results.data;
        console.log(results.data);
      });
  }

  onFormSubmit() {
    // TODO: Implement the navigation to the search page
  }
}
