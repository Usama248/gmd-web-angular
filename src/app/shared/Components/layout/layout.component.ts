import { Component, Injector, OnInit, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { ToastModule } from 'primeng/toast';
import { SideNavComponent } from '../side-nav/side-nav.component';

import {ProgressBarModule} from 'primeng/progressbar';
import { LoaderService } from '../../services/loader.service';
import { SignalrNotificationService } from '../../services/signalr-notification.service';
import { SidebarService } from '../../services/sidebar.service';
@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent, ToastModule, SideNavComponent,ProgressBarModule],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  providers: [SignalrNotificationService]
})
export class LayoutComponent implements OnInit {
  showNav:boolean = true;
  constructor(private injector: Injector, private loader: LoaderService, private notificationService: SignalrNotificationService, private navService:SidebarService) {
    this.navService.onShowNav().subscribe(x => this.showNav =x)
   }
  isLoading = false;
  ngOnInit(): void {
    this.listenToLoading();
    this.notificationService.startConnection();
  }
  listenToLoading(): void {
    effect(() => {
      this.isLoading = this.loader.isLoading();
    }, {injector: this.injector});
  }
}
