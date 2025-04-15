import { ClubsResponseDataList } from '../../types/api-response-data-lists/clubs-response-data-list';
import { IPaginationResponse } from '../pagination-response.interface';

export interface IClubsResponse {
  data: ClubsResponseDataList;
  pagination: IPaginationResponse;
}
