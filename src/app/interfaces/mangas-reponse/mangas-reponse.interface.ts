import { MangasResponseDataList } from '../../types/mangas-response-data-list';
import { IPaginationResponse } from '../pagination-reponse.interface';

export interface IMangasResponse {
  data: MangasResponseDataList;
  pagination: IPaginationResponse;
}
