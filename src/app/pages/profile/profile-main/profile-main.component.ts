import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabViewModule } from 'primeng/tabview';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-profile-main',
  standalone: true,
  imports: [CommonModule, TabViewModule, InputTextModule],
  templateUrl: './profile-main.component.html',
  styleUrls: ['./profile-main.component.scss']
})
export class ProfileMainComponent {
}
