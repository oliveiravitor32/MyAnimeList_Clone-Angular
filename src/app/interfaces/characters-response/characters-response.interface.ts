import { CharactersResponseDataList } from '../../types/characters-response-data-list';
import { IPaginationResponse } from '../pagination-response.interface';

export interface ICharactersResponse {
  data: CharactersResponseDataList;
  pagination: IPaginationResponse;
}
