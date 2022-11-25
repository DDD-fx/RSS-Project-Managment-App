import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WrongAddressPageComponent } from './page404.component';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';
import { Page404RoutingModule } from './page404-routing.module';

@NgModule({
  declarations: [WrongAddressPageComponent],
  imports: [CommonModule, MatButtonModule, TranslateModule, Page404RoutingModule],
})
export class Page404Module {}
