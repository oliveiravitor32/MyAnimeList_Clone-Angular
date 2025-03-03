import { ClubsResponseDataList } from '../../types/clubs-response-data-list';
import { IPaginationResponse } from '../pagination-response.interface';

export interface IClubsResponse {
  data: ClubsResponseDataList;
  pagination: IPaginationResponse;
}
