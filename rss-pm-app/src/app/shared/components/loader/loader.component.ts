import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LoaderService } from './loader.service';
import { AsyncPipe, NgClass } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgClass, AsyncPipe],
})
export class LoaderComponent {
  isTransparent$ = this.loaderService.isTransparent$;

  constructor(private readonly loaderService: LoaderService) {}
}
