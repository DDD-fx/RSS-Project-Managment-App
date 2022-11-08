import { NgModule } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AppRoutingModule } from '../app-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { storeReducer } from '../NgRx/reducers';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [HeaderComponent, FooterComponent],
  imports: [
    AppRoutingModule,
    TranslateModule,
    MatSlideToggleModule,
    MatButtonModule,
    CommonModule,
    StoreModule.forFeature('store', storeReducer),
    MatDialogModule,
  ],
  providers: [],
  bootstrap: [],
  exports: [HeaderComponent, FooterComponent],
})
export class CoreModule {}
