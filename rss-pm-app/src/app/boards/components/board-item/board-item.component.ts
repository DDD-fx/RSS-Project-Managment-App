import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { ICreateBoardResp } from 'src/app/api/models/api-board.model';
import { ApiBoardService } from 'src/app/api/services/api-board.service';
import { deleteBoardById, getCurrentBoard } from 'src/app/NgRx/actions/storeActions';

@Component({
  selector: 'app-board-item',
  templateUrl: './board-item.component.html',
  styleUrls: ['./board-item.component.scss'],
})
export class BoardItemComponent {
  @Input() board!: ICreateBoardResp;

  private customColor: string = '#ffffff';

  constructor(private apiBoardService: ApiBoardService, private store: Store) {}

  onClick(color: string) {
    this.customColor = color;
  }

  saveCurrentBoard() {
    this.store.dispatch(getCurrentBoard({ currentBoard: this.board }));
  }

  onDeleteClick(boardId: string): void {
    this.apiBoardService.deleteBoard(boardId);
    this.store.dispatch(deleteBoardById({ boardId }));
  }
}
