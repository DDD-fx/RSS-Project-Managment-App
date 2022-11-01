import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegFormRoutingModule } from './reg-form-routing.module';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RegFormComponent } from './reg-form.component';

@NgModule({
  declarations: [RegFormComponent],
  imports: [
    CommonModule,
    RegFormRoutingModule,
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
})
export class RegFormModule {}
