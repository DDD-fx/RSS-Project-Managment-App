import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, switchMap } from 'rxjs';
import { ICreateBoardResp, IGetBoardResp } from '../api/models/api-board.model';
import { ApiBoardService } from '../api/services/api-board.service';
import * as StoreActions from './../NgRx/actions/storeActions';

@Injectable()
export class AppEffects {
  constructor(private actions$: Actions, private apiBoardService: ApiBoardService) {}

  getBoards$$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(StoreActions.getAllBoards),
      mergeMap(() => {
        return this.apiBoardService.getBoards().pipe(
          map((boards: ICreateBoardResp[]) => StoreActions.getAllBoardsSuccess({ boards })),
          catchError((error) => of(StoreActions.getAllBoardsFailure({ error: error.message })))
        );
      })
    );
  });

  createBoard$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(StoreActions.createNewBoard),
      switchMap(({ data }) => {
        return this.apiBoardService
          .createBoard(data)
          .pipe(map((board) => StoreActions.createBoardSuccess({ board: { ...board } })));
      })
    );
  });

  editBoard$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(StoreActions.updateBoard),
      switchMap(({ data, boardId }) =>
        this.apiBoardService.updateBoard(data, boardId).pipe(map((board) => StoreActions.createBoardSuccess({ board })))
      )
    );
  });

  getBoard$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(StoreActions.getCurrentBoard),
      mergeMap((actions) => {
        return this.apiBoardService.getBoard(actions.boardId).pipe(
          map((board: IGetBoardResp) => StoreActions.getCurrentBoardSuccess({ board })),
          catchError((error) => of(StoreActions.getAllBoardsFailure({ error: error.message })))
        );
      })
    );
  });
}
