import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CategoryTypeEnum } from '../enums/categoy-type.enum';
import { IAnimesResponse } from '../interfaces/animes-response/animes-response.interface';
import { SearchService } from '../services/search.service';

export const convertCategoryToSearchMethodMap = (
  _searchService: SearchService
): {
  [key in CategoryTypeEnum]: (
    name: string,
    params: HttpParams
  ) => Observable<IAnimesResponse>;
} => ({
  [CategoryTypeEnum.ALL]: _searchService.getAnimesByName.bind(_searchService),
  [CategoryTypeEnum.ANIME]: _searchService.getAnimesByName.bind(_searchService),
  [CategoryTypeEnum.MANGA]: _searchService.getAnimesByName.bind(_searchService),
  [CategoryTypeEnum.CHARACTERS]:
    _searchService.getAnimesByName.bind(_searchService),
  [CategoryTypeEnum.PEOPLE]:
    _searchService.getAnimesByName.bind(_searchService),
  [CategoryTypeEnum.COMPANIES]:
    _searchService.getAnimesByName.bind(_searchService),
  [CategoryTypeEnum.MANGA_STORE]:
    _searchService.getAnimesByName.bind(_searchService),
  [CategoryTypeEnum.NEWS]: _searchService.getAnimesByName.bind(_searchService),
  [CategoryTypeEnum.FEATURED_ARTICLES]:
    _searchService.getAnimesByName.bind(_searchService),
  [CategoryTypeEnum.FORUM]: _searchService.getAnimesByName.bind(_searchService),
  [CategoryTypeEnum.CLUBS]: _searchService.getAnimesByName.bind(_searchService),
  [CategoryTypeEnum.USERS]: _searchService.getAnimesByName.bind(_searchService),
});
