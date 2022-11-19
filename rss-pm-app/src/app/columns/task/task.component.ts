import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoaderService } from 'src/app/shared/components/loader/loader.service';
import { ITask } from '../../api/models/api-board.model';
import { DeletingPopupComponent } from '../../shared/components/deleting-popup/deleting-popup.component';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit {
  @Input() public tasks: ITask[] = [];

  constructor(private readonly loaderService: LoaderService, private readonly dialogRef: MatDialog) {}

  ngOnInit(): void {
    console.log(this.tasks);
  }

  onDeleteTask() {
    this.loaderService.enableLoader();
    let dialog = this.dialogRef.open(DeletingPopupComponent, { data: { name: 'deleting-popup.del-task' } });
    dialog.afterClosed().subscribe((result) => {
      if (result === 'true') {
        // здесь записывать логику удаления
      }
    });
    this.loaderService.disableLoader();
  }
}
