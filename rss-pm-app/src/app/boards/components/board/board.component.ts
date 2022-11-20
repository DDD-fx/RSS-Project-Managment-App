import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IGetBoardResp } from 'src/app/api/models/api-board.model';
import { ApiBoardService } from 'src/app/api/services/api-board.service';
import { LoaderService } from 'src/app/shared/components/loader/loader.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  public constructor(
    private router: Router,
    private route: ActivatedRoute,
    private apiBoardService: ApiBoardService,
    private readonly loaderService: LoaderService
  ) {}

  board!: IGetBoardResp;

  boardId = this.route.snapshot.params['id'];

  ngOnInit(): void {
    this.loaderService.enableLoader();
    this.apiBoardService
      .getBoard(this.boardId)
      .pipe()
      .subscribe((resp) => (this.board = resp));
    this.loaderService.disableLoader();
  }

  onBack() {
    void this.router.navigate(['boards']);
  }
}
