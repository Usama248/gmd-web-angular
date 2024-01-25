import { Component, Input } from '@angular/core';

import { FormControl } from '@angular/forms';
import { MessageModule } from 'primeng/message';
@Component({
  selector: 'app-error-messages',
  standalone: true,
  imports: [MessageModule],
  templateUrl: './error-messages.component.html',
  styleUrls: ['./error-messages.component.scss']
})
export class ErrorMessagesComponent {
  @Input({ required: true }) control: FormControl | undefined;
  @Input({ required: true }) displayName: string | undefined;
  hasErrorWhenDirty(errorCode: string): boolean | undefined {
    return this.control?.dirty && this.control?.hasError(errorCode);
  }

  getErrorProperty(errorCode: string, property: string): string {
    if (!this.control?.errors) return '';
    if (!this.control.errors[errorCode]) return '';
    return this.control?.errors[errorCode][property];
  }
}
