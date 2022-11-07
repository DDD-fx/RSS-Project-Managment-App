import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  }

  constructor(private apiBoardService: ApiBoardService) {}

  createBoard() {
    if (this.boardForm.valid) {
      this.apiBoardService.createBoard(this.boardForm.value).subscribe();
      // this.boards.push(value);
      // console.log(this.boards);
      this.toggleForm();
    }
  }
}
