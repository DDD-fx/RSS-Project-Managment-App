import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ColumnsService } from '../../../columns/columns.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ITask, IUpdateTaskReq } from '../../../api/models/api-board.model';

@Component({
  selector: 'app-edit-task-popup',
  templateUrl: './edit-task-popup.component.html',
  styleUrls: ['./edit-task-popup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditTaskPopupComponent implements OnInit {
  public editTaskForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  });

  constructor(
    private readonly dialogRef: MatDialogRef<EditTaskPopupComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { boardId: string; columnId: string; currTask: ITask },
    private readonly columnsService: ColumnsService
  ) {}

  ngOnInit(): void {
    this.editTaskForm.setValue({
      title: this.data.currTask.title,
      description: this.data.currTask.description,
    });
  }

  editTask(): void {
    if (
      this.editTaskForm.get('title')?.value !== this.data.currTask.title ||
      this.editTaskForm.get('description')?.value !== this.data.currTask.description
    ) {
      const body: IUpdateTaskReq = {
        title: this.editTaskForm.get('title')!.value,
        description: this.editTaskForm.get('description')!.value,
        order: this.data.currTask.order,
        userId: this.data.currTask.userId,
        boardId: this.data.boardId,
        columnId: this.data.columnId,
      };
      this.columnsService.updateTask(this.data.currTask.id, body);
    }
    this.dialogRef.close();
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
