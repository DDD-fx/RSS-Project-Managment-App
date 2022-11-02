import { Component, Input } from '@angular/core';
import { IMember } from '../../models/welcome.models';

@Component({
  selector: 'app-team-member',
  templateUrl: './team-member.component.html',
  styleUrls: ['./team-member.component.scss'],
})
export class TeamMemberComponent {
  @Input() member!: IMember;
}
