import { Component, OnInit } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';
import { SearchService } from '../../services/search.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  private searchText$ = new Subject<string>();

  searchInput = new FormGroup({
    search: new FormControl(['']),
  });

  constructor(private searchService: SearchService) {}

  ngOnInit(): void {
    this.searchText$.pipe(debounceTime(2000)).subscribe(() => {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      this.searchInput.get(['search'])?.value.length >= 3;
    });
  }

  getValue(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }

  search = (text: string) => {
    this.searchText$.next(text);
  };
}
