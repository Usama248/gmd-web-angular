import { Component, Injector, OnDestroy, OnInit, effect } from '@angular/core';
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

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent, ToastModule, SideNavComponent,LoaderComponent],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  providers: [SignalrNotificationService]
})
export class LayoutComponent implements OnInit, OnDestroy {
  showNav:boolean = true;
  isLoading = false;
  constructor(private injector: Injector, private loader: LoaderService, 
    private notificationService: SignalrNotificationService, 
    private navService:SidebarService, private authRepo: AuthRepository) {
    this.navService.onShowNav().subscribe(x => this.showNav =x)
     this.listenToLoading();
   }
  ngOnInit(): void {
    this.getUserData();
  }
  listenToLoading(): void {
    effect(() => {
      this.isLoading = this.loader.isLoading();
    })
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
