import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

import { AppRoutingModule } from './app-routing.module';
import { AppMaterialModule } from './shared/modules/app-material/app-material.module';
import { MaterialModalsModule } from './shared/modules/material-modals/material-modals.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { ApiInterceptor } from './shared/interceptors/api.interceptor';
import { LoaderInterceptor } from './shared/interceptors/loader.interceptor';
import { SharedModule } from './shared/modules/shared/shared.module';
import { environment } from './../environments/environment';

export const socketConfig: SocketIoConfig = { url: environment.socketUrl, options: {} };

export function HttpLoaderFactory(http: HttpClient): TranslateLoader {
  return new TranslateHttpLoader(http, '/assets/locales/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule,
    HttpClientModule,
    FontAwesomeModule,
    MaterialModalsModule,
    SharedModule,
    SocketIoModule.forRoot(socketConfig),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
      useDefaultLang: false
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
