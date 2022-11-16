import { createAction, props } from '@ngrx/store';
import { ICreateBoardResp, IGetBoardResp } from 'src/app/api/models/api-board.model';

export const makeIsloggedTrue = createAction('[Store] Make isLogged true');
export const makeIsloggedFalse = createAction('[Store] Make isLogged false');
export const addUserName = createAction('[Store] Add User Name');
export const removeUserName = createAction('[Store] Remove User Name');

export const getAllBoards = createAction('[Store] Get all boards');
export const getAllBoardsSuccess = createAction(
  '[Store] Get all boards success',
  props<{ boards: ICreateBoardResp[] }>()
);
export const getAllBoardsFailure = createAction('[Store] Get all boards failure', props<{ error: string }>());

export const deleteBoardById = createAction('[Store] Delete board by id', props<{ boardId: string }>());

export const createNewBoard = createAction('[Store] Create new board');

export const getCurrentBoard = createAction('[Store] Get current board');
export const getCurrentBoardSuccess = createAction('[Store] Get current board success', props<{ boardId: string }>());
export const getCurrentBoardFailure = createAction('[Store] Get current board failure', props<{ error: string }>());
export const setCurrentBoard = createAction('[Store] Set current board', props<{ board: IGetBoardResp }>());

export const updateBoard = createAction('[Store] Update board', props<{ board: ICreateBoardResp }>());
