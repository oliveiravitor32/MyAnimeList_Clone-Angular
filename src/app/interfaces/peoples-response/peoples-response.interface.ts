import { PeoplesResponseDataList } from '../../types/peoples-response-data-list';
import { IPaginationResponse } from '../pagination-response.interface';

export interface IPeoplesResponse {
  data: PeoplesResponseDataList;
  paginations: IPaginationResponse;
}
