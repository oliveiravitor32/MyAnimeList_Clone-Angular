import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, take } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { IAnimesResponse } from '../interfaces/animes-response/animes-response.interface';
import { ICharactersResponse } from '../interfaces/characters-response/characters-response.interface';
import { IClubsResponse } from '../interfaces/clubs-response/clubs-response.interface';
import { IMangasResponse } from '../interfaces/mangas-reponse/mangas-response.interface';
import { IPeoplesResponse } from '../interfaces/peoples-response/peoples-response.interface';
import { IUsersResponse } from '../interfaces/users-response/users-response.interface';
import { ApiRateLimiterService } from './api-rate-limiter.service';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  API_URL = environment.apiUrl;

  constructor(private readonly _apiRateLimiterService: ApiRateLimiterService) {}

  /**
   * Main data fetching method with cache handling and rate limiting
   */
  private fetchData<T extends { data: any[]; pagination: any }>(
    endpoint: string,
    query: string,
    additionalParams: HttpParams = new HttpParams(),
    defaultParams: HttpParams = new HttpParams()
  ): Observable<T> {
    // Build final params object
    let params = new HttpParams();
    if (query) {
      params = params.set('q', query);
    }

    // Add default and additional params
    defaultParams.keys().forEach((key) => {
      params = params.set(key, defaultParams.get(key)!);
    });

    additionalParams.keys().forEach((key) => {
      params = params.set(key, additionalParams.get(key)!);
    });

    return this._apiRateLimiterService
      .executeRequest<T>(`${this.API_URL}/${endpoint}`, { params })
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
    additionalParams: HttpParams
  ): Observable<IAnimesResponse> {
    return this.fetchData<IAnimesResponse>('anime', name, additionalParams);
  }

  getAnimesByParams(additionalParams: HttpParams): Observable<IAnimesResponse> {
    return this.fetchData<IAnimesResponse>('anime', '', additionalParams);
  }

  getTopAnimes(additionalParams: HttpParams): Observable<IAnimesResponse> {
    return this.fetchData<IAnimesResponse>('top/anime', '', additionalParams);
  }

  getNextSeasonAnimes(
    additionalParams: HttpParams
  ): Observable<IAnimesResponse> {
    // TODO: CREATE A RESPONSIVE FUNCTION TO GET THE NEXT SEASON
    return this.fetchData<IAnimesResponse>(
      'seasons/2025/spring',
      '',
      additionalParams
    );
  }

  getMangasByName(
    name: string,
    additionalParams: HttpParams
  ): Observable<IMangasResponse> {
    return this.fetchData<IMangasResponse>('manga', name, additionalParams);
  }

  getCharactersByName(
    name: string,
    additionalParams: HttpParams
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
    additionalParams: HttpParams
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
    additionalParams: HttpParams
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
    additionalParams: HttpParams
  ): Observable<IUsersResponse> {
    return this.fetchData<IUsersResponse>('users', name, additionalParams);
  }
}
