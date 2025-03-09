import { Pipe, PipeTransform } from '@angular/core';
import { IAllResponseData } from '../../types/all-response-data';

@Pipe({
  name: 'itemScore',
})
export class ItemScorePipe implements PipeTransform {
  transform(item: IAllResponseData): string {
    if ('score' in item) {
      return item.score?.toString() || 'N/A';
    }
    return 'N/A';
  }
}
