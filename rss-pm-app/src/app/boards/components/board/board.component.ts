import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { ColumnsService } from 'src/app/columns/columns.service';
import { ESiteUrls } from '../../../shared/shared.enums';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent {
  public constructor(private router: Router, private route: ActivatedRoute, private columnsService: ColumnsService) {}

  board$ = this.columnsService.board$;

  title$ = this.board$.pipe(map((board) => board.title));

  boardId = this.route.snapshot.params['id'];

  onBack() {
    void this.router.navigate([ESiteUrls.boards]);
  }
}
