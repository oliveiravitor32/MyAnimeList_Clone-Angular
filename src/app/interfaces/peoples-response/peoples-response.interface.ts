import { PeoplesResponseDataList } from '../../types/api-response-data-lists/peoples-response-data-list';
import { IPaginationResponse } from '../pagination-response.interface';

export interface IPeoplesResponse {
  data: PeoplesResponseDataList;
  pagination: IPaginationResponse;
}
