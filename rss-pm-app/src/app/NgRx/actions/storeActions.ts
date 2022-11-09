import { createAction, props } from '@ngrx/store';
import { ICreateBoardResp } from 'src/app/api/models/api-board.model';

export const makeIsloggedTrue = createAction('[Store] Make isLogged true');
export const makeIsloggedFalse = createAction('[Store] Make isLogged false');
export const addUserName = createAction('[Store] Add User Name');
export const removeUserName = createAction('[Store] Remove User Name');
export const getAllBoards = createAction('[Store] Get all boards', props<{ boards: ICreateBoardResp[] }>());
export const deleteBoardById = createAction('[Store] Delete board by id', props<{ boardId: string }>());
// export const createNewBoard = createAction('[Store] Create new board', props<{ board: ICreateBoardReq }>());
