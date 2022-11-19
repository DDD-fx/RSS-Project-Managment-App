import { ChangeDetectionStrategy, Component, ElementRef, Input } from '@angular/core';
import { ITask } from '../../api/models/api-board.model';
import { ApiTasksService } from '../../api/services/api-tasks.service';
import { ColumnsService } from '../columns.service';
import { switchMap, tap } from 'rxjs';
import { ApiBoardService } from '../../api/services/api-board.service';
import { LoaderService } from '../../shared/components/loader/loader.service';
import { MatDialog } from '@angular/material/dialog';
import { DeletingPopupComponent } from '../../shared/components/deleting-popup/deleting-popup.component';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskComponent {
  @Input() public tasks: ITask[] = [];

  private readonly currBoardId$ = this.columnsService.currBoardId$;

  constructor(
    private readonly apiBoardService: ApiBoardService,
    private readonly columnsService: ColumnsService,
    private readonly apiTasksService: ApiTasksService,
    private readonly loaderService: LoaderService,
    private readonly elRef: ElementRef,
    private readonly dialogRef: MatDialog
  ) {}

  onDeleteTask(taskId: string) {
    let dialog = this.dialogRef.open(DeletingPopupComponent, { data: { name: 'deleting-popup.del-task' } });
    dialog.afterClosed().subscribe((result) => {
      if (result === 'true') {
        this.loaderService.enableLoader();
        this.apiTasksService
          .deleteTask(this.currBoardId$.value, this.elRef.nativeElement.id, taskId)
          .pipe(
            switchMap(() => this.apiBoardService.getBoard(this.currBoardId$.value)),
            tap((board) => this.columnsService.board$.next(board))
          )
          .subscribe(() => this.loaderService.disableLoader());
      }
    });
  }
}
