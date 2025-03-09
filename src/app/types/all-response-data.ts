import { IAnimesResponseData } from '../interfaces/animes-response/animes-response-data.interface';
import { ICharactersResponseData } from '../interfaces/characters-response/characters-response-data.interface';
import { IClubsResponseData } from '../interfaces/clubs-response/clubs-response-data.interface';
import { IMangasResponseData } from '../interfaces/mangas-reponse/mangas-response-data.interface';
import { IPeoplesResponseData } from '../interfaces/peoples-response/peoples-response-data.interface';
import { IUsersResponseData } from '../interfaces/users-response/users-response-data.interface';

export type IAllResponseData =
  | IAnimesResponseData
  | IMangasResponseData
  | ICharactersResponseData
  | IClubsResponseData
  | IPeoplesResponseData
  | IUsersResponseData;
