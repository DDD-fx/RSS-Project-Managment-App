import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustodyComponent } from './custody.component';
import { CustodyRoutingModule } from './custody-routing.module';

@NgModule({
  declarations: [CustodyComponent],
  imports: [CommonModule, CustodyRoutingModule],
})
export class CustodyModule {}
