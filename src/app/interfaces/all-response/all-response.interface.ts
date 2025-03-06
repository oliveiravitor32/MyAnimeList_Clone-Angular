import { AllResponseDataList } from '../../types/all-response-data-list';
import { IPaginationResponse } from '../pagination-response.interface';

export interface IAllResponse {
  data: AllResponseDataList;
  pagination: IPaginationResponse;
}
