import { ChangeDetectionStrategy, Component, ElementRef, Input } from '@angular/core';
import { ITask } from '../../api/models/api-board.model';
import { ApiTasksService } from '../../api/services/api-tasks.service';
import { ColumnsService } from '../columns.service';
import { switchMap, tap } from 'rxjs';
import { ApiBoardService } from '../../api/services/api-board.service';
import { LoaderService } from '../../shared/components/loader/loader.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskComponent {
  @Input() public tasks: ITask[] = [];

  constructor(
    private readonly apiBoardService: ApiBoardService,
    private readonly columnsService: ColumnsService,
    private readonly apiTasksService: ApiTasksService,
    private readonly loaderService: LoaderService,
    private readonly elRef: ElementRef
  ) {}

  onDeleteTask(taskId: string) {
    this.loaderService.enableLoader();
    this.apiTasksService
      .deleteTask(this.columnsService.currBoardId, this.elRef.nativeElement.id, taskId)
      .pipe(
        switchMap(() => this.apiBoardService.getBoard(this.columnsService.currBoardId)),
        tap((board) => this.columnsService.board$.next(board))
      )
      .subscribe(() => this.loaderService.disableLoader());
  }
}
