import { Pipe, PipeTransform } from '@angular/core';
import { IAllResponseData } from '../../types/all-response-data';

@Pipe({
  name: 'itemIsOneOf',
})
export class ItemIsOneOfPipe implements PipeTransform {
  transform(item: IAllResponseData, types: string[]): boolean {
    const typeMap: { [key: string]: boolean } = {
      ['anime']: 'aired' in item,
      ['manga']: 'published' in item,
      ['character']: 'favorites' in item,
      ['club']: 'members' in item,
      ['people']: 'birthday' in item,
      ['user']: 'username' in item,
    };

    for (let type of types) {
      if (typeMap[type]) {
        return true;
      }
    }
    return false;
  }
}
