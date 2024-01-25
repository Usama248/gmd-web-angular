import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'utcToLocal',
  standalone: true
})
export class UtcToLocalPipe implements PipeTransform {
  constructor() {}

  transform(utcTime: string | null): string | null {
    if (utcTime) {
      const userTimeZone = navigator.language;
      let d = utcTime;
      let format = 'MMM dd yyyy hh:mm a';
      let x = new DatePipe(userTimeZone).transform(d,format+ " UTC");
      return new DatePipe(userTimeZone).transform(x,format);
    }
    return "";
  }
}
