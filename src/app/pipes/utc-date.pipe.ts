import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'utcDate',
})
export class UtcDatePipe extends DatePipe implements PipeTransform {
  override transform(value: any, format: string = 'mediumDate'): any {
    return super.transform(value, format, 'UTC');
  }
}
