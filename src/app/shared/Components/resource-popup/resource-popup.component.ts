import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-resource-popup',
  standalone: true,
  imports: [ButtonModule, NgClass],
  templateUrl: './resource-popup.component.html',
  styleUrls: ['./resource-popup.component.scss']
})
export class ResourcePopupComponent {
  @Input() isShow: boolean | undefined;
  @Output() isShowEvent = new EventEmitter<boolean>();

  togglePopup() {
    this.isShow = !this.isShow
    this.isShowEvent.emit(this.isShow);
  }
}
