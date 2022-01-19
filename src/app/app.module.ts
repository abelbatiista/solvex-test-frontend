// Angular Modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Routing Modules
import { AppRoutingModule } from './app-routing.module';

// Pipes Modules
import { PipesModule } from './pipes/pipes.module';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { FilterModule } from './filter';

// Modules
import { SocketIoModule } from 'ngx-socket-io';

// User Modules
import { MaterialModule } from './material/material.module';
import { AuthModule } from './auth/auth.module';
import { ExceptionsModule } from './exceptions/exceptions.module';
import { SharedModule } from './shared/shared.module';
import { PagesModule } from './pages/pages.module';

// Providers
import { UserInterceptor } from './interceptors/user.interceptor';

// Angular Components
import { AppComponent } from './app.component';

// User Components

// Environment
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    SocketIoModule.forRoot( { url: environment.socket_url, options: {} }),
    FilterPipeModule,
    FilterModule,
    MaterialModule,
    PagesModule,
    SharedModule,
    BrowserAnimationsModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: UserInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
