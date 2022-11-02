import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomePageComponent } from './components/welcome-page/welcome-page.component';
import { WelcomeRoutingModule } from './welcome-routing.module';
import { TeamMemberComponent } from './components/team-member/team-member.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [WelcomePageComponent, TeamMemberComponent],
  imports: [CommonModule, WelcomeRoutingModule, MatCardModule, MatButtonModule, TranslateModule],
  exports: [WelcomePageComponent],
})
export class WelcomeModule {}
