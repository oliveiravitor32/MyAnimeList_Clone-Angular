import { AnimesResponseDataList } from '../../types/api-response-data-lists/animes-response-data-list';
import { IPaginationResponse } from '../pagination-response.interface';

export interface IAnimesResponse {
  data: AnimesResponseDataList;
  pagination: IPaginationResponse;
}
