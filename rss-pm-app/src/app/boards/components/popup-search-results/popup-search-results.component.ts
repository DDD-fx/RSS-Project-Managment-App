import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ITaskSearch } from '../../models/boards.models';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-popup-search-results',
  templateUrl: './popup-search-results.component.html',
  styleUrls: ['./popup-search-results.component.scss'],
})
export class PopupSearchResultsComponent {
  tasks$: ITaskSearch[] = [];

  constructor(
    private searchService: SearchService,
    private dialogRef: MatDialogRef<PopupSearchResultsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { searchText: string }
  ) {}

  searchTasks(searchText: string) {
    console.log(searchText);
    this.tasks$ = this.searchService.searchTasks(searchText);
    console.log(this.tasks$);
  }

  closeSearchResult() {
    this.dialogRef.close();
  }
}
