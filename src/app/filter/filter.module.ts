// @Module
import { NgModule } from '@angular/core';

// Pipe
import { FilterPipe } from './filter.pipe';

@NgModule({
  declarations: [
    FilterPipe
  ],
  providers: [
    FilterPipe
  ],
  exports: [
    FilterPipe
  ]
})
export class FilterModule { }
