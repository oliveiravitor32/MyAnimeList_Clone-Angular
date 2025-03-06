import { AnimesResponseDataList } from './animes-response-data-list';
import { CharactersResponseDataList } from './characters-response-data-list';
import { ClubsResponseDataList } from './clubs-response-data-list';
import { MangasResponseDataList } from './mangas-response-data-list';
import { PeoplesResponseDataList } from './peoples-response-data-list';
import { UsersResponseDataList } from './users-response-data-list';

export type AllResponseDataList =
  | AnimesResponseDataList
  | ClubsResponseDataList
  | PeoplesResponseDataList
  | UsersResponseDataList
  | MangasResponseDataList
  | CharactersResponseDataList;
