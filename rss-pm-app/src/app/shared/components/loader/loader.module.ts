import { NgModule } from '@angular/core';
import { AsyncPipe, CommonModule, NgClass } from '@angular/common';
import { LoaderComponent } from './loader.component';

@NgModule({
  declarations: [LoaderComponent],
  imports: [CommonModule, AsyncPipe, NgClass],
  exports: [LoaderComponent],
})
export class LoaderModule {}
