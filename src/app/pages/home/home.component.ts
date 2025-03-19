import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { AnimesResponseDataList } from '../../types/animes-response-data-list';
import { SearchService } from './../../services/search.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  topAiringAnimes: AnimesResponseDataList = [];
  topUpcomingAnimes: AnimesResponseDataList = [];
  mostPopularAnimes: AnimesResponseDataList = [];

  constructor(private readonly _searchService: SearchService) {}
  ngOnInit(): void {
    const mostPopularAnimes = new HttpParams()
      .set('filter', 'bypopularity')
      .set('limit', '10');

    const topAiringAnimesParams = new HttpParams()
      .set('filter', 'airing')
      .set('limit', '5');

    const topUpcomingAnimesParams = new HttpParams()
      .set('filter', 'upcoming')
      .set('limit', '5');

    this.getMostPopularAnimes(mostPopularAnimes);
    this.getTopAiringAnimes(topAiringAnimesParams);
    this.getTopUpcomingAnimes(topUpcomingAnimesParams);
  }

  getMostPopularAnimes(params: HttpParams): void {
    this._searchService
      .getTopAnimes(params)
      .pipe(take(1))
      .subscribe((response) => {
        this.mostPopularAnimes = response.data;
      });
  }

  getTopAiringAnimes(params: HttpParams): void {
    this._searchService
      .getTopAnimes(params)
      .pipe(take(1))
      .subscribe((response) => {
        this.topAiringAnimes = response.data;
      });
  }

  getTopUpcomingAnimes(params: HttpParams): void {
    this._searchService
      .getTopAnimes(params)
      .pipe(take(1))
      .subscribe((response) => {
        this.topUpcomingAnimes = response.data;
      });
  }
}
