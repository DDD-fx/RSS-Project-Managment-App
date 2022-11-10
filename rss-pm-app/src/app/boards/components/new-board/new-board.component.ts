import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ApiBoardService } from 'src/app/api/services/api-board.service';

@Component({
  selector: 'app-new-board',
  templateUrl: './new-board.component.html',
  styleUrls: ['./new-board.component.scss'],
})
export class NewBoardComponent {
  public boardForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl(''),
  });

  isFormActive = false;

  // boards: IBoard[] = [];

  toggleForm() {
    this.isFormActive = !this.isFormActive;
    this.boardForm.controls['title'].setValue('');
    this.boardForm.controls['description'].setValue('');
    this.boardForm.markAsUntouched();
  }

  constructor(private apiBoardService: ApiBoardService, private store: Store) {}

  createBoard() {
    if (this.boardForm.valid) {
      this.apiBoardService.createBoard(this.boardForm.value).subscribe();
      // this.store.dispatch(createNewBoard(this.boardForm.value));
      this.toggleForm();
    }
  }
}
