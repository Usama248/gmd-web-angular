import { Component, OnInit, ViewEncapsulation, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { RouterModule } from '@angular/router';
import {ProgressBarModule} from 'primeng/progressbar';
import { NgOptimizedImage } from '@angular/common'
import { LoaderService } from 'src/app/shared/services/loader.service';
@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [CommonModule,RouterModule, ToastModule, ProgressSpinnerModule, ProgressBarModule, NgOptimizedImage],
  templateUrl: './auth-layout.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./auth-layout.component.scss']
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
