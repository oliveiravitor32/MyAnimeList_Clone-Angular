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
  nextSeasonAnimes: AnimesResponseDataList = [];

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

    const nextSeasonAnimesParams = new HttpParams().set('limit', '20');

    this.getMostPopularAnimes(mostPopularAnimes);
    this.getTopAiringAnimes(topAiringAnimesParams);
    this.getTopUpcomingAnimes(topUpcomingAnimesParams);
    this.getNextSeasonAnimes(nextSeasonAnimesParams);
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

  getNextSeasonAnimes(params: HttpParams): void {
    this._searchService
      .getNextSeasonAnimes(params)
      .pipe(take(1))
      .subscribe((response) => {
        console.log(response.data);
        this.nextSeasonAnimes = response.data;
      });
  }
}
