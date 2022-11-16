import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ApiBoardService } from 'src/app/api/services/api-board.service';
import { getAllBoards } from 'src/app/NgRx/actions/storeActions';
import { LoaderService } from '../../../shared/components/loader/loader.service';

@Component({
  selector: 'app-new-board',
  templateUrl: './new-board.component.html',
  styleUrls: ['./new-board.component.scss'],
})
export class NewBoardComponent {
  public boardForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  });

  isFormActive = false;

  // boards: IBoard[] = [];

  toggleForm() {
    this.isFormActive = !this.isFormActive;
    this.boardForm.controls['title'].setValue('');
    this.boardForm.controls['description'].setValue('');
    this.boardForm.markAsUntouched();
  }

  constructor(
    private apiBoardService: ApiBoardService,
    private store: Store,
    private readonly loaderService: LoaderService
  ) {}

  createBoard() {
    if (this.boardForm.valid) {
      this.apiBoardService.createBoard(this.boardForm.value).subscribe();
      this.store.dispatch(getAllBoards());
      this.loaderService.disableLoader();
      this.toggleForm();
    }
  }
}
