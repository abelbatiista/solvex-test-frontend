// Angular Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Routing Modules
import { ComponentsRoutingModule } from './components-routing.module';

// User Components
import { ComponentsComponent } from './components.component';

@NgModule({
  declarations: [
    ComponentsComponent
  ],
  imports: [
    CommonModule,
    ComponentsRoutingModule
  ]
})
export class ComponentsModule { }
