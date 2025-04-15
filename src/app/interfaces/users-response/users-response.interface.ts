import { UsersResponseDataList } from '../../types/api-response-data-lists/users-response-data-list';
import { IPaginationResponse } from '../pagination-response.interface';

export interface IUsersResponse {
  data: UsersResponseDataList;
  pagination: IPaginationResponse;
}
