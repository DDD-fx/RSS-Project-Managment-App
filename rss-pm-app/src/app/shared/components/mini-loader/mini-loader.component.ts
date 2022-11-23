import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-mini-loader',
  templateUrl: './mini-loader.component.html',
  styleUrls: ['./mini-loader.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MiniLoaderComponent {}
