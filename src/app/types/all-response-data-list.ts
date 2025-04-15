import { AnimesResponseDataList } from './api-response-data-lists/animes-response-data-list';
import { CharactersResponseDataList } from './api-response-data-lists/characters-response-data-list';
import { ClubsResponseDataList } from './api-response-data-lists/clubs-response-data-list';
import { MangasResponseDataList } from './api-response-data-lists/mangas-response-data-list';
import { PeoplesResponseDataList } from './api-response-data-lists/peoples-response-data-list';
import { UsersResponseDataList } from './api-response-data-lists/users-response-data-list';

export type AllResponseDataList =
  | AnimesResponseDataList
  | ClubsResponseDataList
  | PeoplesResponseDataList
  | UsersResponseDataList
  | MangasResponseDataList
  | CharactersResponseDataList;
