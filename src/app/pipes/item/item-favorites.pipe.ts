import { Pipe, PipeTransform } from '@angular/core';
import { IAllResponseData } from '../../types/all-response-data';

@Pipe({
  name: 'itemFavorites',
})
export class ItemFavoritesPipe implements PipeTransform {
  transform(item: IAllResponseData): string {
    if ('favorites' in item) {
      return item.favorites?.toString() || 'N/A';
    }
    return 'N/A';
  }
}
