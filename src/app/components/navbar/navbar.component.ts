import { categoryTypeArray } from './../../utils/category-type-description-map';
import { CategoryTypeEnum } from './../../enums/categoy-type.enum';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  switchMap,
  take,
} from 'rxjs/operators';
import { faMagnifyingGlass, faTimes } from '@fortawesome/free-solid-svg-icons';
import { AnimesResponseDataList } from '../../types/animes-reponse-data-list';
import { LinkGroupsList } from '../../types/link-groups-list';
import { SearchService } from '../../services/search.service';
import { HttpParams } from '@angular/common/http';
import { convertCategoryToSearchMethodMap } from '../../utils/convert-category-to-search-method-map';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  searchIcon = faMagnifyingGlass;
  closeIcon = faTimes;

  searchedAnimes: AnimesResponseDataList = [];

  get categoryTypeArray() {
    return categoryTypeArray;
  }

  searchForm = new FormGroup({
    category: new FormControl(
      this.categoryTypeArray[0]?.code || CategoryTypeEnum.ALL
    ),
    text: new FormControl('', Validators.required),
  });

  LinkGroupsList: LinkGroupsList = [
    {
      title: 'Anime',
      linksList: [
        { title: 'Anime Search', path: '' },
        { title: 'Top Anime', path: '' },
        { title: 'Seasonal Anime', path: '' },
        { title: 'Videos', path: '' },
        { title: 'Reviews', path: '' },
        { title: 'Recommendations', path: '' },
        { title: '2024 Challenge', path: '' },
        { title: 'Fantasy Anime League', path: '' },
      ],
    },
    {
      title: 'Manga',
      linksList: [
        { title: 'Manga Search', path: '' },
        { title: 'Top Manga', path: '' },
        { title: 'Adapted to Anime', path: '' },
        { title: 'Manga Store', path: '' },
        { title: 'Reviews', path: '' },
        { title: 'Recommendations', path: '' },
        { title: '2024 Challenge', path: '' },
      ],
    },
    {
      title: 'Community',
      linksList: [
        { title: 'Interest Stacks', path: '' },
        { title: 'Forums', path: '' },
        { title: 'Clubs', path: '' },
        { title: 'Blogs', path: '' },
        { title: 'Users', path: '' },
      ],
    },
    {
      title: 'Industry',
      linksList: [
        { title: 'News', path: '' },
        { title: 'Featured Articles', path: '' },
        { title: 'People', path: '' },
        { title: 'Characters', path: '' },
        { title: 'Companies', path: '' },
        { title: 'MAL x Japan', path: '' },
      ],
    },
    {
      title: 'Watch',
      linksList: [
        { title: 'Episode Videos', path: '' },
        { title: 'Anime Trailers', path: '' },
      ],
    },
    {
      title: 'Read',
      linksList: [{ title: 'Manga Store', path: '' }],
    },
    {
      title: 'Help',
      linksList: [
        { title: 'About', path: '' },
        { title: 'Support', path: '' },
        { title: 'Advertising', path: '' },
        { title: 'Faq', path: '' },
        { title: 'Report', path: '' },
        { title: 'Staff', path: '' },
        { title: 'MAL Supporter', path: '' },
      ],
    },
  ];

  constructor(private readonly _searchService: SearchService) {}

  ngOnInit(): void {
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
        this.searchedAnimes = results.data;
        console.log(results.data);
      });
  }

  clearSearch() {
    console.log('');
    this.searchForm.get('text')!.reset();
  }

  onSubmit() {
    // TODO
  }
}
