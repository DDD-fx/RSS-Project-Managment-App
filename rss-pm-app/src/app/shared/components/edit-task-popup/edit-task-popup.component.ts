import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ColumnsService } from '../../../columns/columns.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IUpdateTaskReq } from '../../../api/models/api-board.model';
import { getUserIdFromLs } from '../../shared.utils';

@Component({
  selector: 'app-edit-task-popup',
  templateUrl: './edit-task-popup.component.html',
  styleUrls: ['./edit-task-popup.component.scss'],
})
export class EditTaskPopupComponent {
  public editTaskForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  });

  constructor(
    private dialogRef: MatDialogRef<EditTaskPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { boardId: string; columnId: string; taskId: string; taskOrder: number },
    private readonly columnsService: ColumnsService
  ) {}

  editTask(): void {
    const body: IUpdateTaskReq = {
      title: this.editTaskForm.get('title')!.value,
      order: this.data.taskOrder,
      description: this.editTaskForm.get('description')!.value,
      userId: getUserIdFromLs(),
      boardId: this.data.boardId,
      columnId: this.data.columnId,
    };
    this.columnsService.updateTask(this.data.taskId, body);
    this.dialogRef.close();
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
