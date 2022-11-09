import { ActionReducerMap, createReducer, MetaReducer, on } from '@ngrx/store';
import { ELocalStorage } from 'src/app/shared/shared.enums';
import { environment } from '../../../environments/environment';
import {
  makeIsloggedFalse,
  makeIsloggedTrue,
  addUserName,
  removeUserName,
  getAllBoards,
  deleteBoardById,
} from '../actions/storeActions';
import { IStore } from '../interfaces/store.interface';

export interface State {}

export const reducers: ActionReducerMap<State> = {};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];

export const Store: IStore = {
  isLogged: false,
  userName: null,
  boards: [],
};

export const storeReducer = createReducer(
  Store,
  on(makeIsloggedTrue, (state: any): IStore => ({ ...state, isLogged: true })),
  on(makeIsloggedFalse, (state: any): IStore => ({ ...state, isLogged: false })),
  on(addUserName, (state: any): IStore => ({ ...state, userName: localStorage.getItem(ELocalStorage.userName) })),
  on(removeUserName, (state: any): IStore => ({ ...state, userName: null })),
  on(getAllBoards, (state: any, { boards }): IStore => ({ ...state, boards: boards })),
  on(
    deleteBoardById,
    (state, { boardId }): IStore => ({
      ...state,
      boards: state.boards.filter((el) => el.id !== boardId),
    })
  )
  // on(createNewBoard, (state: any, { board }): IStore => ({ ...state, boards: [...state.boards, board] }))
);
