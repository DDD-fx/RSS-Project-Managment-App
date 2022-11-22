import { Component, OnInit } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';
import { SearchService } from '../../services/search.service';
import { FormControl, FormGroup } from '@angular/forms';
import { PopupSearchResultsComponent } from '../popup-search-results/popup-search-results.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  searchInput = new FormGroup({
    search: new FormControl(['']),
  });

  searchText$ = new Subject<string>();

  constructor(private searchService: SearchService, private dialogRef: MatDialog) {}

  ngOnInit(): void {
    this.searchText$.pipe(debounceTime(2000)).subscribe(() => {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      this.searchInput.get(['search'])?.value.length >= 3;
    });
  }

  searchTasks() {
    console.log(this.searchInput.get(['search'])?.value);
    this.dialogRef.open(PopupSearchResultsComponent, { data: this.searchInput.get(['search'])?.value });
  }
}
