import { Pipe, PipeTransform } from '@angular/core';
import { IAllResponseData } from '../../types/all-response-data';

@Pipe({
  name: 'itemTitle',
})
export class ItemTitlePipe implements PipeTransform {
  transform(item: IAllResponseData, fallback: string = 'Unknown'): string {
    if ('title' in item) {
      return item.title;
    }
    if ('name' in item) {
      return item.name;
    }
    if ('username' in item) {
      return item.username;
    }
    return fallback;
  }
}
