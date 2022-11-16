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
}
