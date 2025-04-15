import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { AnimesResponseDataList } from '../../types/api-response-data-lists/animes-response-data-list';
import { CharactersResponseDataList } from '../../types/api-response-data-lists/characters-response-data-list';
import { SearchService } from './../../services/search.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent implements OnInit {
  topAnimes: AnimesResponseDataList = [];
  topAiringAnimes: AnimesResponseDataList = [];
  topCharacters: CharactersResponseDataList = [];

  constructor(private readonly _searchService: SearchService) {}

  private RESULT_LIMIT = 5;

  ngOnInit(): void {
    this.getTopAnimes();
    this.getTopAiringAnimes();
    this.getTopCharacters();
  }

  getTopAnimes() {
    const params = new HttpParams().set('limit', this.RESULT_LIMIT);
    this._searchService
      .getTopAnimes(params)
      .pipe(take(1))
      .subscribe((response) => {
        this.topAnimes = response.data;
      });
  }

  getTopAiringAnimes() {
    const params = new HttpParams().set('limit', this.RESULT_LIMIT);

    this._searchService
      .getTopAiringAnimes(params)
      .pipe(take(1))
      .subscribe((response) => {
        this.topAiringAnimes = response.data;
      });
  }

  getTopCharacters(): void {
    const params = new HttpParams().set('limit', this.RESULT_LIMIT);

    this._searchService
      .getTopCharacters(params)
      .pipe(take(1))
      .subscribe((response) => {
        this.topCharacters = response.data;
      });
  }
}
