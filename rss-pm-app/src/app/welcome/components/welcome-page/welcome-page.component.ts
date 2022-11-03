import { Component } from '@angular/core';
import { team } from 'src/app/shared/shared.consts';
import { IMember } from '../../models/welcome.models';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss'],
})
export class WelcomePageComponent {
  public team: IMember[] = team;
}
