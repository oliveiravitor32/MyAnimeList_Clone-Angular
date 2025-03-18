import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, take } from 'rxjs';
import { environment } from '../environments/environment';
import { IAnimesResponse } from '../interfaces/animes-response/animes-response.interface';
import { ICharactersResponse } from '../interfaces/characters-response/characters-response.interface';
import { IClubsResponse } from '../interfaces/clubs-response/clubs-response.interface';
import { IMangasResponse } from '../interfaces/mangas-reponse/mangas-response.interface';
import { IPeoplesResponse } from '../interfaces/peoples-response/peoples-response.interface';
import { IUsersResponse } from '../interfaces/users-response/users-response.interface';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  API_URL = environment.apiUrl;

  constructor(private readonly _httpClient: HttpClient) {}

  private fetchData<T extends { data: any[]; pagination: any }>(
    endpoint: string,
    query: string,
    additionalParams: HttpParams = new HttpParams(),
    defaultParams: HttpParams = new HttpParams()
  ): Observable<T> {
    // Start with query param
    let params = new HttpParams().set('q', query);

    // Add default params for this endpoint type
    defaultParams.keys().forEach((key) => {
      params = params.set(key, defaultParams.get(key)!);
    });

    // Add request-specific params (overrides defaults if same keys)
    additionalParams.keys().forEach((key) => {
      params = params.set(key, additionalParams.get(key)!);
    });

    // Make the API call
    return this._httpClient
      .get<T>(`${this.API_URL}/${endpoint}`, { params })
      .pipe(
        take(1),
        catchError((error) => {
          console.error(`Error fetching ${endpoint}:`, error);
          // Return empty result instead of throwing error
          return of({
            data: [],
            pagination: {
              items: { count: 0, total: 0, per_page: 0 },
            },
          } as unknown as T);
        })
      );
  }

  // Simplified endpoint methods
  getAnimesByName(
    name: string,
    additionalParams: HttpParams = new HttpParams()
  ): Observable<IAnimesResponse> {
    return this.fetchData<IAnimesResponse>('anime', name, additionalParams);
  }

  getAnimesByParams(
    additionalParams: HttpParams = new HttpParams()
  ): Observable<IAnimesResponse> {
    return this.fetchData<IAnimesResponse>('anime', '', additionalParams);
  }

  getMangasByName(
    name: string,
    additionalParams: HttpParams = new HttpParams()
  ): Observable<IMangasResponse> {
    return this.fetchData<IMangasResponse>('manga', name, additionalParams);
  }

  getCharactersByName(
    name: string,
    additionalParams: HttpParams = new HttpParams()
  ): Observable<ICharactersResponse> {
    const defaultParams = new HttpParams()
      .set('order_by', 'favorites')
      .set('sort', 'desc');
    return this.fetchData<ICharactersResponse>(
      'characters',
      name,
      additionalParams,
      defaultParams
    );
  }

  getPeoplesByName(
    name: string,
    additionalParams: HttpParams = new HttpParams()
  ): Observable<IPeoplesResponse> {
    const defaultParams = new HttpParams()
      .set('order_by', 'favorites')
      .set('sort', 'desc');
    return this.fetchData<IPeoplesResponse>(
      'people',
      name,
      additionalParams,
      defaultParams
    );
  }

  getClubsByName(
    name: string,
    additionalParams: HttpParams = new HttpParams()
  ): Observable<IClubsResponse> {
    const defaultParams = new HttpParams()
      .set('order_by', 'members_count')
      .set('sort', 'desc');
    return this.fetchData<IClubsResponse>(
      'clubs',
      name,
      additionalParams,
      defaultParams
    );
  }

  getUsersByName(
    name: string,
    additionalParams: HttpParams = new HttpParams()
  ): Observable<IUsersResponse> {
    return this.fetchData<IUsersResponse>('users', name, additionalParams);
  }
}
