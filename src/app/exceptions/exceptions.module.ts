// Angular Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Routing Modules
import { ExceptionsRoutingModule } from './exceptions-routing.module';

// User Components
import { ExceptionsComponent } from './exceptions.component';
import { NotfoundComponent } from './notfound/notfound.component';


@NgModule({
  declarations: [
    ExceptionsComponent,
    NotfoundComponent
  ],
  imports: [
    CommonModule,
    ExceptionsRoutingModule
  ],
  exports: []
})
export class ExceptionsModule { }
