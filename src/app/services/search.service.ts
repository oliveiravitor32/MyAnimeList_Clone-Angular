import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../environments/environment';
import { IAnimesResponse } from '../interfaces/animes-response/animes-response.interface';
import { ICharactersResponse } from '../interfaces/characters-response/characters-response.interface';
import { IMangasResponse } from '../interfaces/mangas-reponse/mangas-response.interface';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  API_URL = environment.apiUrl;

  constructor(private readonly _httpClient: HttpClient) {}

  getAnimesByName(
    name: string,
    additionalParams: HttpParams
  ): Observable<IAnimesResponse> {
    let params = new HttpParams().set('q', name);

    // Merge additionalParams into params
    additionalParams.keys().forEach((key) => {
      params = params.set(key, additionalParams.get(key)!);
    });

    return this._httpClient
      .get<IAnimesResponse>(`${this.API_URL}/anime`, {
        params,
      })
      .pipe(
        catchError((error) => {
          console.error('Error fetching animes:', error);
          return throwError(error);
        })
      );
  }

  getMangasByName(
    name: string,
    additionalParams: HttpParams
  ): Observable<IMangasResponse> {
    let params = new HttpParams().set('q', name);

    // Merge additionalParams into params
    additionalParams.keys().forEach((key) => {
      params = params.set(key, additionalParams.get(key)!);
    });

    return this._httpClient
      .get<IMangasResponse>(`${this.API_URL}/manga`, {
        params,
      })
      .pipe(
        catchError((error) => {
          console.error('Error fetching mangas:', error);
          return throwError(error);
        })
      );
  }

  getCharactersByName(
    name: string,
    additionalParams: HttpParams
  ): Observable<ICharactersResponse> {
    let params = new HttpParams()
      .set('q', name)
      .set('order_by', 'favorites')
      .set('sort', 'desc');

    // Merge additionalParams into params
    additionalParams.keys().forEach((key) => {
      params = params.set(key, additionalParams.get(key)!);
    });

    return this._httpClient
      .get<ICharactersResponse>(`${this.API_URL}/characters`, {
        params,
      })
      .pipe(
        catchError((error) => {
          console.error('Error fetching characters:', error);
          return throwError(error);
        })
      );
  }
}
