import { Component, OnInit, ViewEncapsulation, effect } from '@angular/core';

import { ToastModule } from 'primeng/toast';
import { RouterModule } from '@angular/router';
import { NgOptimizedImage } from '@angular/common'
import { delay } from 'rxjs';
import { LoaderService } from '../../../shared/services/loader.service';
import { LoaderComponent } from '../../../shared/components/loader/loader.component';
@Component({
    selector: 'app-auth-layout',
    standalone: true,
    templateUrl: './auth-layout.component.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./auth-layout.component.scss'],
    imports: [RouterModule, ToastModule, NgOptimizedImage, LoaderComponent]
})
export class AuthLayoutComponent implements OnInit {
  isLoading = false;
  constructor(private loader: LoaderService) {
    this.listenToLoading();
   }
  ngOnInit(): void {
  }

  listenToLoading(): void {
    this.loader.isLoading
      .pipe(delay(0)) // This prevents a ExpressionChangedAfterItHasBeenCheckedError for subsequent requests
      .subscribe((loading) => {
        this.isLoading = loading;
      });
  }
}
