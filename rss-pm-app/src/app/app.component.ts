import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LoaderService } from './shared/components/loader/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  public isLoading$ = this.loaderService.isLoading$;

  constructor(public loaderService: LoaderService) {}
}
