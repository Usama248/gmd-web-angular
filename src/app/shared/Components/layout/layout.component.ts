import { ChangeDetectionStrategy, Component, HostListener, Injector, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { LoaderService } from '../../services/loader.service';
import { SignalrNotificationService } from '../../services/signalr-notification.service';
import { SidebarService } from '../../services/sidebar.service';
import { AuthRepository } from 'src/app/services/auth-service/auth.repository';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { SideNavComponent } from '../side-nav/side-nav.component';
import { LoaderComponent } from '../loader/loader.component';
import { MessagesModule } from 'primeng/messages';
import { MenuItem, Message } from 'primeng/api';
import { delay } from 'rxjs';
import { BreadcrumbModule } from 'primeng/breadcrumb';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent, ToastModule, SideNavComponent, LoaderComponent, MessagesModule, BreadcrumbModule],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  providers: [SignalrNotificationService]
})
export class LayoutComponent implements OnInit, OnDestroy {
  showNav: boolean = true;
  isLoading = false;
  isScreenSmall: boolean = window.innerWidth < 1024;
  messages: Message[] = [];
  items: MenuItem[] | undefined;
  home: MenuItem | undefined;
  constructor(private injector: Injector, private loader: LoaderService,
    private notificationService: SignalrNotificationService,
    private navService: SidebarService, private authRepo: AuthRepository) {
    this.navService.onShowNav().subscribe(x => this.showNav = x)
    this.listenToLoading();
  }
  ngOnInit(): void {
    this.getUserData();
    this.items = [{ label: 'Computer' }, { label: 'Notebook' }, { label: 'Accessories' }, { label: 'Backpacks' }, { label: 'Item' }];
    this.home = { icon: 'pi pi-home', routerLink: '/' };
    this.messages = [
      { severity: 'warn', detail: 'ATTENTION: You have not registered any clinical users (Standard or Advanced users) under this account.' },
    ];
  }
  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.isScreenSmall = window.innerWidth < 1024;
  }
  listenToLoading(): void {
    this.loader.isLoading
      .pipe(delay(0)) // This prevents a ExpressionChangedAfterItHasBeenCheckedError for subsequent requests
      .subscribe((loading) => {
        this.isLoading = loading;
      });
  }
  ngOnDestroy(): void {
    this.notificationService.closeConnection();
  }
  getUserData() {
    this.authRepo.getLoginUserData(false).subscribe(res => {
      console.log(res);
    });
  }
}
