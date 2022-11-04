import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IBoard } from '../../models/boards.models';
import { BoardsService } from '../../services/boards.service';

@Component({
  selector: 'app-new-board',
  templateUrl: './new-board.component.html',
  styleUrls: ['./new-board.component.scss'],
})
export class NewBoardComponent {
  public boardForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl(''),
  });

  isFormActive = false;

  boards: IBoard[] = [];

  toggleForm() {
    this.isFormActive = !this.isFormActive;
  }

  constructor(private boardsService: BoardsService) {}

  createBoard() {
    if (this.boardForm.valid) {
      this.boardsService.createBoard(this.boardForm.value).subscribe((value: IBoard) => {
        this.boards.push(value);
        console.log(this.boards);
        this.toggleForm();
      });
    }
  }
}
