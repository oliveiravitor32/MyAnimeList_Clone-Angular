import { CharactersReponseDataList } from '../../types/characters-reponse-data-list';
import { IPaginationResponse } from '../pagination-reponse.interface';

export interface ICharactersResponse {
  data: CharactersReponseDataList;
  pagination: IPaginationResponse;
}
