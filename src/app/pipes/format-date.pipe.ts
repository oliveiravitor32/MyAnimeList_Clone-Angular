import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatDate',
})
export class FormatDatePipe implements PipeTransform {
  transform(from: string, to?: string): string {
    // Date formatter with US format and UTC timezone
    const dateFormatter = new Intl.DateTimeFormat('en-US', {
      timeZone: 'UTC',
    });

    let formatedDate = '';

    if (to) {
      const fromStr = dateFormatter.format(new Date(from));
      const toDate = new Date(to);
      formatedDate = `${fromStr} to ${dateFormatter.format(toDate)}`;
    } else {
      formatedDate = new Date(from).getFullYear().toString();
    }

    return formatedDate || 'N/A';
  }
}
