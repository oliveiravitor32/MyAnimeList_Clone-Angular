export interface IPeoplesResponseData {
  mal_id: number;
  url: string;
  website_url: string;
  images: {
    jpg: {
      image_url: string;
    };
  };
  name: string;
  given_name: string;
  family_name: string;
  alternate_names: string[];
  birthday: string;
  favorites: number;
  about: string;
}
