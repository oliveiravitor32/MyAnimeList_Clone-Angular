import { AnimesResponseDataList } from '../../types/animes-reponse-data-list';
import { IPaginationResponse } from '../pagination-reponse.interface';

export interface IAnimeResponse {
  data: AnimesResponseDataList;
  pagination: IPaginationResponse;
}
