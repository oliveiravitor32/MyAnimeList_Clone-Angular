import { AnimesResponseDataList } from '../../types/animes-reponse-data-list';

export interface IAnimeResponse {
  data: AnimesResponseDataList;
  pagination: {
    last_visible_page: number;
    has_next_page: boolean;
    items: {
      count: number;
      total: number;
      per_page: number;
    };
  };
}
