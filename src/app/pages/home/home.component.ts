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
    const defaultParams = new HttpParams().set('type', 'tv').set('sort', 'asc');

    const mostPopularAnimes = defaultParams
      .set('order_by', 'popularity')
      .set('limit', '10');

    const topAiringAnimesParams = defaultParams
      .set('order_by', 'score')
      .set('sort', 'desc')
      .set('status', 'airing')
      .set('limit', '5');

    const topUpcomingAnimesParams = defaultParams
      .set('order_by', 'popularity')
      .set('status', 'upcoming')
      .set('limit', '5');

    this.getMostPopularAnimes(mostPopularAnimes);
    this.getTopAiringAnimes(topAiringAnimesParams);
    this.getTopUpcomingAnimes(topUpcomingAnimesParams);
  }

  getMostPopularAnimes(params: HttpParams): void {
    this._searchService
      .getAnimesByParams(params)
      .pipe(take(1))
      .subscribe((response) => {
        this.mostPopularAnimes = response.data;
      });
  }

  getTopAiringAnimes(params: HttpParams): void {
    this._searchService
      .getAnimesByParams(params)
      .pipe(take(1))
      .subscribe((response) => {
        this.topAiringAnimes = response.data;
      });
  }

  getTopUpcomingAnimes(params: HttpParams): void {
    this._searchService
      .getAnimesByParams(params)
      .pipe(take(1))
      .subscribe((response) => {
        this.topUpcomingAnimes = response.data;
      });
  }
}
