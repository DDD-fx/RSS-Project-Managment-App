import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, mergeMap, of, switchMap, tap } from 'rxjs';
import { ICreateBoardResp, IGetBoardResp } from '../api/models/api-board.model';
import { ApiBoardService } from '../api/services/api-board.service';
import { AuthService } from '../auth/services/auth.service';
import { ELocalStorage, ESiteUrls } from '../shared/shared.enums';
import * as StoreActions from './../NgRx/actions/storeActions';
import { NotificationService } from '../api/notification.service';

@Injectable()
export class AppEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly apiBoardService: ApiBoardService,
    private readonly authService: AuthService,
    private readonly store: Store,
    private readonly router: Router,
    private readonly notificationService: NotificationService
  ) {
    const token = localStorage.getItem('token');
    if (token) {
      this.store.dispatch(StoreActions.saveToken({ token }));
    }
  }

  getBoards$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(StoreActions.getAllBoards),
      mergeMap(() => {
        return this.apiBoardService.getBoards().pipe(
          map((boards: ICreateBoardResp[]) => StoreActions.getAllBoardsSuccess({ boards })),
          catchError((error) => {
            this.notificationService.showError(ESiteUrls.columns, error);
            return of(StoreActions.getAllBoardsFailure({ error: error.message }));
          })
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
          catchError((error) => of(StoreActions.getCurrentBoardFailure({ error: error.message })))
        );
      })
    );
  });

  redirectIfTokenExpired$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(StoreActions.tokenExpired),
      tap(() => {
        localStorage.removeItem(ELocalStorage.token);
        this.authService.onLogOut();
        void this.router.navigate(['']);
      })
    );
  });
}
