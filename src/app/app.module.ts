// Angular Modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// Routing Modules
import { AppRoutingModule } from './app-routing.module';

// User Modules
import { AuthModule } from './auth/auth.module';
import { ExceptionsModule } from './exceptions/exceptions.module';
import { SharedModule } from './shared/shared.module';

// Providers
import { UserInterceptor } from './interceptors/user.interceptor';

// Angular Components
import { AppComponent } from './app.component';
import { PagesModule } from './pages/pages.module';

// User Components


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    PagesModule,
    SharedModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: UserInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
