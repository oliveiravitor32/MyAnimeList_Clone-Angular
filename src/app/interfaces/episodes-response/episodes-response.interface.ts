import { IPaginationResponse } from '../pagination-response.interface';
import { EpisodesResponseDataList } from './../../types/api-response-data-lists/episodes-response-data-list';

export interface IEpisodesResponse {
  data: EpisodesResponseDataList;
  pagination: IPaginationResponse;
}
