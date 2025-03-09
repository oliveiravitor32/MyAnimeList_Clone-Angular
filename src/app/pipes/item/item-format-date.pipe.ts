import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { IAllResponseData } from '../../types/all-response-data';

@Pipe({
  name: 'itemFormatDate',
})
export class ItemFormatDatePipe implements PipeTransform {
  constructor(private datePipe: DatePipe) {}
  transform(item: IAllResponseData, format: string = 'mediumDate'): string {
    let formatedDate: string | Date | null = null;

    if ('aired' in item && item.aired?.from) {
      formatedDate =
        this.datePipe.transform(item.aired.from, format, 'UTC') + item.aired.to
          ? ' to ' + this.datePipe.transform(item.aired.to, format, 'UTC')
          : '';
    }
    if ('published' in item && item.published?.from) {
      formatedDate =
        this.datePipe.transform(item.published.from, format, 'UTC') +
        item.published.to
          ? ' to ' + this.datePipe.transform(item.published.to, format, 'UTC')
          : '';
    }
    return formatedDate || 'N/A';
  }
}
