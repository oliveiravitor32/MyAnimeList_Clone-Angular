import { AnimesResponseDataList } from '../../types/animes-response-data-list';
import { IPaginationResponse } from '../pagination-response.interface';

export interface IAnimesResponse {
  data: AnimesResponseDataList;
  pagination: IPaginationResponse;
}
