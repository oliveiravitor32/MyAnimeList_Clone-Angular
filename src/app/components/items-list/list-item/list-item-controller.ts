export class ListItemController {
  // Map of pipe types to handler methods
  private readonly pipeHandlerMap: { [key: string]: (item: any) => any } = {
    itemTitle: this.getTitleValue.bind(this),
    itemNicknames: this.getNicknamesValue.bind(this),
    itemImage: this.getImageValue.bind(this),
    itemType: this.getTypeValue.bind(this),
    itemReleaseYear: this.getReleaseYearValue.bind(this),
    itemBirthday: this.getBirthdayValue.bind(this),
    itemFormatDate: this.getFormattedDateValue.bind(this),
    itemScore: this.getScoreValue.bind(this),
    itemFavorites: this.getFavoritesValue.bind(this),
    itemStatus: this.getStatusValue.bind(this),
  };

  // Helper to get pipe transformed values
  protected getPipeValue(item: any, pipeType: string): any {
    if (!item) return '';

    // Look up handler in map and call it if found
    const handler = this.pipeHandlerMap[pipeType];
    return handler ? handler(item) : '';
  }

  // Implementation of individual property extractors
  protected getTitleValue(item: any): string {
    return item?.title || item?.name || item?.username || 'Unknown';
  }

  getNicknamesValue(item: any): any {
    return item.nicknames ? item.nicknames : [];
  }

  protected getImageValue(item: any): string {
    if (!item) return '/assets/images/placeholder.png';

    if (item.images?.jpg?.image_url) {
      return item.images.jpg.image_url;
    }

    if (item.images?.webp?.image_url) {
      return item.images.webp.image_url;
    }

    return item.image_url || item.picture || '/assets/images/placeholder.png';
  }

  protected getTypeValue(item: any): string {
    if ('type' in item) return item.type || 'Unknown';
    if ('aired' in item) return 'Anime';
    if ('published' in item) return 'Manga';
    if ('nicknames' in item) return 'Character';
    if ('birthday' in item) return 'Person';
    if ('members' in item) return 'Club';
    if ('username' in item) return 'User';
    return 'Unknown';
  }

  protected getReleaseYearValue(item: any): string {
    // For anime
    if ('aired' in item && item.aired?.prop?.from?.year) {
      return item.aired.prop.from.year.toString();
    }

    // For manga
    if ('published' in item && item.published?.prop?.from?.year) {
      return item.published.prop.from.year.toString();
    }

    return 'N/A';
  }

  protected getFormattedDateValue(item: any): string {
    // For anime
    if ('aired' in item && item.aired?.from) {
      return this.formatDate(item.aired.from, item.aired.to);
    }

    // For manga
    if ('published' in item && item.published?.from) {
      return this.formatDate(item.published.from, item.published.to);
    }

    return 'N/A';
  }

  protected formatDate(from: string, to?: string): string {
    if (!from) return 'N/A';

    const fromDate = new Date(from);
    const fromStr = fromDate.toLocaleDateString();

    if (to) {
      const toDate = new Date(to);
      return `${fromStr} to ${toDate.toLocaleDateString()}`;
    }

    return fromStr;
  }

  protected getScoreValue(item: any): string {
    return item.score ? item.score.toString() : 'N/A';
  }

  protected getFavoritesValue(item: any): any {
    return item.favorites ? item.favorites.toString() : 'N/A';
  }

  protected getStatusValue(item: any): string {
    return item.status || 'Unknown';
  }

  protected getBirthdayValue(item: any): string {
    // For people (birth year)
    if ('birthday' in item && item.birthday) {
      const date = new Date(item.birthday);
      return date.getFullYear().toString();
    }

    return 'N/A';
  }
}
