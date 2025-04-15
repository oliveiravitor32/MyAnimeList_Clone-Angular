import { MangasResponseDataList } from '../../types/api-response-data-lists/mangas-response-data-list';
import { IPaginationResponse } from '../pagination-response.interface';

export interface IMangasResponse {
  data: MangasResponseDataList;
  pagination: IPaginationResponse;
}
