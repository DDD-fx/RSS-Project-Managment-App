import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { CoreModule } from './core/core.module';
import { interceptorProviders } from './api/interceptors/interceptors';
import { ToastrModule } from 'ngx-toastr';
import { MatDialogModule } from '@angular/material/dialog';
import { DeletingPopupComponent } from './shared/components/deleting-popup/deleting-popup.component';
import { MatButtonModule } from '@angular/material/button';
import { WrongAddressPageComponent } from './shared/components/page404/page404.component';
import { CreatingBoardPopupComponent } from './shared/components/creating-board-popup/creating-board-popup.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { UpdateBoardPopupComponent } from './shared/components/update-board-popup/update-board-popup.component';
import { ColumnsPageModule } from './columns/columns-page.module';
import { LoaderComponent } from './shared/components/loader/loader.component';

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}
const uiModules = [MatSidenavModule, MatIconModule, MatButtonModule];

@NgModule({
  declarations: [
    AppComponent,
    DeletingPopupComponent,
    WrongAddressPageComponent,
    CreatingBoardPopupComponent,
    UpdateBoardPopupComponent,
    LoaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule.forRoot(),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    BrowserAnimationsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    CoreModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatCardModule,
    ReactiveFormsModule,
    uiModules,
    ColumnsPageModule,
  ],
  providers: [interceptorProviders],
  bootstrap: [AppComponent],
  exports: [uiModules],
})
export class AppModule {}
