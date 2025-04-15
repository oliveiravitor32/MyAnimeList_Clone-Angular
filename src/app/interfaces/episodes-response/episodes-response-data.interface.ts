export interface IEpisodesResponseData {
  entry: {
    mal_id: number;
    url: string;
    images: {
      jpg: {
        image_url: string;
        small_image_url: string;
        large_image_url: string;
      };
      webp: {
        image_url: string;
        small_image_url: string;
        large_image_url: string;
      };
    };
    title: string;
  };
  episodes: {
    mal_id: string;
    url: string;
    title: string;
    premium: boolean;
  }[];
  region_locked: boolean;
}
