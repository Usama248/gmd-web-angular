import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpRequestsHandlerInterceptor } from './interceptors/http-request-interceptor/http-requests-handler.interceptor';
import { provideStore } from '@ngrx/store';
import { MessageService } from 'primeng/api';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async'
import { rootReducer } from '../store/reducers';
import { environment } from '../environments/environment.prod';
export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpRequestsHandlerInterceptor,
      multi: true
  },
  provideStore(rootReducer),
  MessageService,
  provideAnimationsAsync(),
  importProvidersFrom(
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
    HttpClientModule),
],
};

