import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
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

  constructor(private dialogRef: MatDialog) {}

  ngOnInit(): void {
    this.searchText$.pipe().subscribe();
  }

  searchTasks() {
    if (this.searchInput.get(['search'])?.value.length > 0) {
      this.dialogRef.open(PopupSearchResultsComponent, {
        data: { searchText: this.searchInput.get(['search'])?.value },
        panelClass: 'customSearch',
      });
      this.searchInput.controls.search.setValue(['']);
    }
  }
}
