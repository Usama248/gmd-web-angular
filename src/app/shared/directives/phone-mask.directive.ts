import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appPhoneMask]',
  standalone: true
})
export class PhoneMaskDirective {

  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event'])
  onInput(event: any): void {
    const input = event.target;
    const trimmed = input.value.replace(/\s+/g, ''); // Remove spaces
    const numbers = trimmed.replace(/\D/g, ''); // Remove non-numeric characters

    if (numbers.length <= 10) {
      // Format the phone number as per your preference
      const formattedValue = this.formatPhoneNumber(numbers);
      input.value = formattedValue;
    } else {
      // Do not allow more than 10 digits
      input.value = input.value.slice(0, 10);
    }
  }

  private formatPhoneNumber(value: string): string {
    const formattedValue = value.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
    return formattedValue;
  }
}