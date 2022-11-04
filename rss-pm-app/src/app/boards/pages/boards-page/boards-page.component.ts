import { Component } from '@angular/core';
import { IBoard } from '../../models/boards.models';

@Component({
  selector: 'app-boards-page',
  templateUrl: './boards-page.component.html',
  styleUrls: ['./boards-page.component.scss'],
})
export class BoardsPageComponent {
  boards: IBoard[] = [];
}
