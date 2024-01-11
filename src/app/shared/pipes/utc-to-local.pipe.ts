import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'utcToLocal',
  standalone: true
})
export class UtcToLocalPipe implements PipeTransform {
  constructor() {}

  transform(utcTime: string | null): Date | null {
    if (utcTime) {
      const userTimeZone = navigator.language;
      let d = utcTime;
      return new Date(d)
    }
    return new Date();
  }
}
