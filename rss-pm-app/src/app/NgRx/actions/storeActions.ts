import { createAction, props } from '@ngrx/store';
import { ICreateBoardResp } from 'src/app/api/models/api-board.model';

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
// export const createNewBoard = createAction('[Store] Create new board', props<{ board: ICreateBoardReq }>());
export const getCurrentBoard = createAction('[Store] Get current board', props<{ currentBoard: ICreateBoardResp }>());
export const updateBoard = createAction('[Store] Update board', props<{ board: ICreateBoardResp }>());
