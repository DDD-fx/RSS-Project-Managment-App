import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
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
          map((boards: any) => StoreActions.getAllBoardsSuccess({ boards })),
          catchError((error) => of(StoreActions.getAllBoardsFailure({ error: error.message })))
        );
      })
    );
  });

  getBoard$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(StoreActions.getCurrentBoard),
      mergeMap((actions) => {
        return this.apiBoardService.getBoard(actions.boardId).pipe(
          map((board: any) => StoreActions.getCurrentBoardSuccess({ board })),
          catchError((error) => of(StoreActions.getAllBoardsFailure({ error: error.message })))
        );
      })
    );
  });

  constructor(private actions$: Actions, private apiBoardService: ApiBoardService) {}
}
