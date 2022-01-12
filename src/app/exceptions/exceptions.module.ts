import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotfoundComponent } from './notfound/notfound.component';
import { ExceptionsComponent } from './exceptions.component';



@NgModule({
  declarations: [
    NotfoundComponent,
    ExceptionsComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ExceptionsModule { }
