import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { AnimesResponseDataList } from '../../types/api-response-data-lists/animes-response-data-list';
import { SearchService } from './../../services/search.service';
import { EpisodesResponseDataList } from './../../types/api-response-data-lists/episodes-response-data-list';

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
  recentEpisodes: EpisodesResponseDataList = [];

  constructor(private readonly _searchService: SearchService) {}
  ngOnInit(): void {
    this.getTopAiringAnimes();
    this.getNextSeasonAnimes();
    this.getTopUpcomingAnimes();
    this.getMostPopularAnimes();
    this.getRecentEpisodes();
  }

  getMostPopularAnimes(): void {
    const params = new HttpParams().set('limit', '10');

    this._searchService
      .getMostPopularAnimes(params)
      .pipe(take(1))
      .subscribe((response) => {
        this.mostPopularAnimes = response.data;
      });
  }

  getTopAiringAnimes(): void {
    const params = new HttpParams().set('limit', '5');

    this._searchService
      .getTopAiringAnimes(params)
      .pipe(take(1))
      .subscribe((response) => {
        this.topAiringAnimes = response.data;
      });
  }

  getTopUpcomingAnimes(): void {
    const params = new HttpParams().set('limit', '5');

    this._searchService
      .getTopUpcomingAnimes(params)
      .pipe(take(1))
      .subscribe((response) => {
        this.topUpcomingAnimes = response.data;
      });
  }

  getNextSeasonAnimes(): void {
    const params = new HttpParams().set('limit', '21');

    this._searchService
      .getNextSeasonAnimes(params)
      .pipe(take(1))
      .subscribe((response) => {
        this.nextSeasonAnimes = response.data;
      });
  }

  getRecentEpisodes(): void {
    const params = new HttpParams().set('limit', '5');

    this._searchService
      .getRecentEpisodes()
      .pipe(take(1))
      .subscribe((response) => {
        this.recentEpisodes = response.data;
      });
  }
}
