import { Pipe, PipeTransform } from '@angular/core';
import { IAllResponseData } from '../../types/all-response-data';

@Pipe({
  name: 'itemType',
})
export class ItemTypePipe implements PipeTransform {
  transform(item: IAllResponseData): string {
    if (!item) return 'N/A';

    if ('type' in item) {
      return item?.type;
    }

    return 'N/A';
  }
}
