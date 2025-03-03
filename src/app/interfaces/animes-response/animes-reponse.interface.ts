import { AnimesResponseDataList } from '../../types/animes-reponse-data-list';
import { IPaginationResponse } from '../pagination-reponse.interface';

export interface IAnimesResponse {
  data: AnimesResponseDataList;
  pagination: IPaginationResponse;
}
