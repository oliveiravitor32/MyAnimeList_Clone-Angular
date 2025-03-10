export const typeChecksMap: {
  [key: string]: (item: any) => boolean;
} = {
  anime: (item: any) => item && 'aired' in item,
  manga: (item: any) => item && 'published' in item,
  character: (item: any) => item && 'nicknames' in item,
  club: (item: any) => item && 'members' in item,
  people: (item: any) => item && 'birthday' in item,
  user: (item: any) => item && 'username' in item,
};
