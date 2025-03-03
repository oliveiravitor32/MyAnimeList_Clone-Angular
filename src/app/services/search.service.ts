import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { IAnimeResponse } from '../interfaces/animes-response/animes-reponse.interface';
import { catchError, Observable, throwError } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  API_URL = environment.apiUrl + '/anime';

  constructor(private readonly _httpClient: HttpClient) {}

  getAnimesByName(
    name: string,
    additionalParams: HttpParams
  ): Observable<IAnimeResponse> {
    let params = new HttpParams().set('q', name);

    // Merge additionalParams into params
    additionalParams.keys().forEach((key) => {
      params = params.set(key, additionalParams.get(key)!);
    });

    return this._httpClient
      .get<IAnimeResponse>(`${this.API_URL}`, {
        params,
      })
      .pipe(
        catchError((error) => {
          console.error('Error fetching animes:', error);
          return throwError(error);
        })
      );
  }
}
