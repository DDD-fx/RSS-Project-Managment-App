import { Component, Input } from '@angular/core';
import { IBoard } from '../../models/boards.models';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent {
  @Input() board!: IBoard;

  private customColor: string = '#ffffff';

  onClick(color: string) {
    this.customColor = color;
  }

  // board: IBoard = {
  //   id: '9a111e19-24ec-43e1-b8c4-13776842b8d5',
  //   title: 'Homework tasks',
  //   description: 'My board tasks',
  // };
}
