import { CategoryTypeEnum } from './../enums/categoy-type.enum';

export const categoryTypeDescriptionMap: { [key in CategoryTypeEnum]: string } =
  {
    [CategoryTypeEnum.ANIME]: 'Anime',
    [CategoryTypeEnum.MANGA]: 'Manga',
    [CategoryTypeEnum.CHARACTERS]: 'Characters',
    [CategoryTypeEnum.PEOPLE]: 'People',
    // NOT SUPPORTED END POINTS
    // [CategoryTypeEnum.ALL]: 'All',
    // [CategoryTypeEnum.COMPANIES]: 'Companies',
    // [CategoryTypeEnum.MANGA_STORE]: 'Manga Store',
    // [CategoryTypeEnum.NEWS]: 'News',
    // [CategoryTypeEnum.FEATURED_ARTICLES]: 'Featured Articles',
    // [CategoryTypeEnum.FORUM]: 'Forum',
    [CategoryTypeEnum.CLUBS]: 'Clubs',
    [CategoryTypeEnum.USERS]: 'Users',
  };

export const categoryTypeArray = Object.keys(categoryTypeDescriptionMap)
  .map(Number)
  .map((key) => {
    return {
      code: key,
      description: categoryTypeDescriptionMap[key as CategoryTypeEnum],
    };
  });
