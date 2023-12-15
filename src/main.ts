import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { AppRoutingModule } from './app/app-routing.module';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { HttpRequestsHandlerInterceptor } from './app/interceptors/http-request-interceptor/http-requests-handler.interceptor';
import { provideStore } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from './environments/environment';
import { rootReducer } from './store/reducers';


bootstrapApplication(AppComponent, {
    providers: [{
        provide: HTTP_INTERCEPTORS,
        useClass: HttpRequestsHandlerInterceptor,
        multi: true
    },
    provideStore(rootReducer),
    MessageService, importProvidersFrom(BrowserModule, BrowserAnimationsModule, AppRoutingModule, HttpClientModule, StoreDevtoolsModule.instrument({
        maxAge: 25, // Retains last 25 states
        logOnly: environment.production, // Restrict extension to log-only mode
      }))]
}).catch(err => console.error(err));
