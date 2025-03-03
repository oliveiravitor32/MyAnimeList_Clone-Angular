import { UsersResponseDataList } from '../../types/users-response-data-list';
import { IPaginationResponse } from '../pagination-response.interface';

export interface IUsersResponse {
  data: UsersResponseDataList;
  pagination: IPaginationResponse;
}
