import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ColumnsService } from '../../../columns/columns.service';
import { ICreateTaskReq } from '../../../api/models/api-board.model';
import { ELocalStorage } from '../../shared.enums';

@Component({
  selector: 'app-creating-board-popup',
  templateUrl: './create-task-popup.component.html',
  styleUrls: ['./create-task-popup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateTaskPopupComponent {
  public taskForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  });

  constructor(
    private readonly dialogRef: MatDialogRef<CreateTaskPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
    private readonly columnsService: ColumnsService
  ) {}

  createNewTask(): void {
    const body: ICreateTaskReq = {
      title: this.taskForm.controls['title'].value,
      description: this.taskForm.controls['description'].value,
      userId: localStorage.getItem(ELocalStorage.userId)!,
    };
    this.columnsService.createNewTask(this.data, body);
    this.dialogRef.close();
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
