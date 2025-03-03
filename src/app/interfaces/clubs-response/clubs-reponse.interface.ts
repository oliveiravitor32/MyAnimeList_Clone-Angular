import { ClubsResponseDataList } from '../../types/clubs-reponse-data-list';
import { IPaginationResponse } from '../pagination-reponse.interface';

export interface IClubsResponse {
  data: ClubsResponseDataList;
  pagination: IPaginationResponse;
}
