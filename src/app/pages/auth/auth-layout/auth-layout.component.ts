import { Component, OnInit, ViewEncapsulation, effect } from '@angular/core';
import { NgIf } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { RouterModule } from '@angular/router';
import { NgOptimizedImage } from '@angular/common'
import { LoaderService } from 'src/app/shared/services/loader.service';
import { LoaderComponent } from 'src/app/shared/components/loader/loader.component';
@Component({
    selector: 'app-auth-layout',
    standalone: true,
    templateUrl: './auth-layout.component.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./auth-layout.component.scss'],
    imports: [NgIf, RouterModule, ToastModule, NgOptimizedImage, LoaderComponent]
})
export class AuthLayoutComponent implements OnInit {
  isLoading = false;
  constructor(private loader: LoaderService) {
    this.listenToLoading();
   }
  ngOnInit(): void {
  }

  listenToLoading(): void {
    effect(() => {
      this.isLoading = this.loader.isLoading();
    });
  }
}
