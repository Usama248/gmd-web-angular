import { Component, Injector, OnInit, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { ToastModule } from 'primeng/toast';
import {ProgressBarModule} from 'primeng/progressbar';
import { LoaderService } from '../../services/loader.service';
import { SignalrNotificationService } from '../../services/signalr-notification.service';
import { AppState } from 'src/store/store';
import { Store } from '@ngrx/store';
import { loadUserData } from 'src/store/actions';
@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent, ToastModule, ProgressBarModule],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  providers: [SignalrNotificationService]
})
export class LayoutComponent implements OnInit {
  isLoading = false;
  constructor(private loader: LoaderService, private notificationService: SignalrNotificationService, private store: Store<AppState>) { 
    this.listenToLoading();
  }
  ngOnInit(): void {
    this.notificationService.startConnection();
    this.loadUserData();
  }
  listenToLoading(): void {
    effect(() => {
      this.isLoading = this.loader.isLoading();
    });
  }
   loadUserData() {
     this.store.dispatch(loadUserData());
   }
  
}
