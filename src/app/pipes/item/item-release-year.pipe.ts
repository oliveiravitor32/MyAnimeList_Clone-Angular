import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { IAllResponseData } from '../../types/all-response-data';

@Pipe({
  name: 'itemReleaseYear',
})
export class ItemReleaseYearPipe implements PipeTransform {
  constructor(private datePipe: DatePipe) {}
  transform(item: IAllResponseData): string {
    if (!item) return 'N/A';

    let dateValue: string | Date | null = null;

    // Extract the appropriate date field based on item type
    if ('aired' in item) {
      console.log('anime');
      dateValue = item.aired.from;
    }
    if ('published' in item) {
      console.log('manga');
      dateValue = item.published.from;
    }

    // Use the parent DatePipe's transform method to format the date
    const formattedYear = this.datePipe.transform(dateValue, 'yyyy', 'UTC');
    return formattedYear || 'N/A';
  }
}
