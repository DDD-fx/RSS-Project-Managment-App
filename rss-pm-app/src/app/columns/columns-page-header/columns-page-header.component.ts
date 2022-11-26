import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ColumnsService } from '../columns.service';
import { map } from 'rxjs';
import { ESiteUrls } from '../../shared/shared.enums';

@Component({
  selector: 'app-columns-page-header',
  templateUrl: './columns-page-header.component.html',
  styleUrls: ['./columns-page-header.component.scss'],
})
export class ColumnsPageHeaderComponent {
  private readonly board$ = this.columnsService.board$;

  public readonly title$ = this.board$.pipe(map((board) => board.title));

  constructor(private readonly router: Router, private readonly columnsService: ColumnsService) {}

  onBack() {
    void this.router.navigate([ESiteUrls.boards]);
  }
}
