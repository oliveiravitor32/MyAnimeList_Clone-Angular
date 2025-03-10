import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CategoryTypeEnum } from '../enums/categoy-type.enum';
import { IAllResponse } from '../interfaces/all-response/all-response.interface';
import { SearchService } from '../services/search.service';

export const convertCategoryToSearchMethodMap = (
  _searchService: SearchService
): {
  [key in CategoryTypeEnum]: (
    name: string,
    params: HttpParams
  ) => Observable<IAllResponse>;
} => ({
  [CategoryTypeEnum.ALL]: _searchService.getAnimesByName.bind(_searchService),
  [CategoryTypeEnum.ANIME]: _searchService.getAnimesByName.bind(_searchService),
  [CategoryTypeEnum.MANGA]: _searchService.getMangasByName.bind(_searchService),
  [CategoryTypeEnum.CHARACTERS]:
    _searchService.getCharactersByName.bind(_searchService),
  [CategoryTypeEnum.PEOPLE]:
    _searchService.getPeoplesByName.bind(_searchService),
  // NOT SUPPORTED END POINTS
  // [CategoryTypeEnum.COMPANIES]:
  //   _searchService.getAnimesByName.bind(_searchService),
  // [CategoryTypeEnum.MANGA_STORE]:
  //   _searchService.getAnimesByName.bind(_searchService),
  // [CategoryTypeEnum.NEWS]: _searchService.getAnimesByName.bind(_searchService),
  // [CategoryTypeEnum.FEATURED_ARTICLES]:
  //   _searchService.getAnimesByName.bind(_searchService),
  // [CategoryTypeEnum.FORUM]: _searchService.getAnimesByName.bind(_searchService),
  [CategoryTypeEnum.CLUBS]: _searchService.getClubsByName.bind(_searchService),
  [CategoryTypeEnum.USERS]: _searchService.getUsersByName.bind(_searchService),
});
