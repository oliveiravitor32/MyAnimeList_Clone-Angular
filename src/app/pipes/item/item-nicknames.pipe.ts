import { Pipe, PipeTransform } from '@angular/core';
import { IAllResponseData } from '../../types/all-response-data';

@Pipe({
  name: 'itemNicknames',
})
export class ItemNicknamesPipe implements PipeTransform {
  transform(item: IAllResponseData): string[] {
    if ('nicknames' in item) {
      return item.nicknames;
    }

    return [];
  }
}
