import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LoaderService } from './loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoaderComponent {
  isTransparent$ = this.loaderService.isTransparent$;

  constructor(private readonly loaderService: LoaderService) {}
}
