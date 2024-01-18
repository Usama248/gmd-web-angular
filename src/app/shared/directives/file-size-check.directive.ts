import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { ToastService } from '../services/toast.service';

@Directive({
  selector: '[appFileSizeCheck]',
  standalone: true
})
export class FileSizeCheckDirective {
  constructor(private toastrService: ToastService) {}
  @Input() maxSize: number = 20; // Default max size in MB
  @Output() errorMessage: EventEmitter<string> = new EventEmitter<string>();

  @HostListener('change', ['$event.target.files'])
  onChange(files: FileList): void {
    if (files && files.length > 0) {
      const fileSize = files[0].size / (1024 * 1024); // Convert to MB
      if (fileSize > this.maxSize) {
        const errorMessage = `File size exceeds the maximum allowed size of ${this.maxSize} MB.`;
        this.toastrService.showError(errorMessage);
        this.errorMessage.emit(errorMessage);
        // Clear the input field
        const input = this.getHostElement() as HTMLInputElement;
        if (input) {
          input.value = '';
        }
      }
    }
  }

  private getHostElement(): HTMLElement | null {
    return document.querySelector('[appFileSizeCheck]') as HTMLElement;
  }
}