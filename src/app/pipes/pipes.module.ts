// Angular Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// User Pipes
import { ImagePipe } from './image.pipe';
import { KeyValueToUserPipe } from './key-value-to-user.pipe';
import { FilterByObjectPipe } from './filter-by-object.pipe';
import { MessagePipe } from './message.pipe';

@NgModule({
  declarations: [
    ImagePipe,
    KeyValueToUserPipe,
    FilterByObjectPipe,
    MessagePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ImagePipe,
    KeyValueToUserPipe,
    FilterByObjectPipe,
    MessagePipe
  ]
})
export class PipesModule { }
