import { Pipe, PipeTransform } from '@angular/core';
import { IAllResponseData } from '../../types/all-response-data';

@Pipe({
  name: 'itemStatus',
})
export class ItemStatusPipe implements PipeTransform {
  transform(item: IAllResponseData): string {
    if ('status' in item) {
      return item.status;
    }
    return 'N/A';
  }
}
