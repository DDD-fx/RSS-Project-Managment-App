import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { ICreateBoardResp } from 'src/app/api/models/api-board.model';
import { ApiBoardService } from 'src/app/api/services/api-board.service';
import { deleteBoardById } from 'src/app/NgRx/actions/storeActions';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent {
  @Input() board!: ICreateBoardResp;

  private customColor: string = '#ffffff';

  constructor(private apiBoardService: ApiBoardService, private store: Store) {}

  onClick(color: string) {
    this.customColor = color;
  }

  onDeleteClick(boardId: string): void {
    this.apiBoardService.deleteBoard(boardId);
    this.store.dispatch(deleteBoardById({ boardId }));
  }
}
