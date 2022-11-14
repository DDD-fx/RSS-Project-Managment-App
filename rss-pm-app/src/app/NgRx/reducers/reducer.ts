import { ActionReducerMap, createReducer, MetaReducer, on } from '@ngrx/store';
import { ELocalStorage } from 'src/app/shared/shared.enums';
import { environment } from '../../../environments/environment';
import * as StoreActions from '../actions/storeActions';
import { IStore } from '../interfaces/store.interface';

export interface State {}

export const reducers: ActionReducerMap<State> = {};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];

export const Store: IStore = {
  isLogged: false,
  userName: null,
  isLoading: false,
  error: null,
  boards: [],
  currentBoard: { title: '', description: '', id: '' },
};

export const storeReducer = createReducer(
  Store,
  on(StoreActions.makeIsloggedTrue, (state): IStore => ({ ...state, isLogged: true })),
  on(StoreActions.makeIsloggedFalse, (state): IStore => ({ ...state, isLogged: false })),
  on(
    StoreActions.addUserName,
    (state): IStore => ({ ...state, userName: localStorage.getItem(ELocalStorage.userName) })
  ),
  on(StoreActions.removeUserName, (state): IStore => ({ ...state, userName: null })),

  on(StoreActions.getAllBoards, (state): IStore => ({ ...state, isLoading: true })),
  on(
    StoreActions.getAllBoardsSuccess,
    (state, action): IStore => ({ ...state, isLoading: false, boards: action.boards })
  ),
  on(
    StoreActions.getAllBoardsFailure,
    (state, action): IStore => ({ ...state, isLoading: false, error: action.error })
  ),

  on(
    StoreActions.deleteBoardById,
    (state, { boardId }): IStore => ({
      ...state,
      boards: state.boards.filter((el) => el.id !== boardId),
    })
  ),
  // on(createNewBoard, (state: any, { board }): IStore => ({ ...state, boards: [...state.boards, board] }))
  on(StoreActions.getCurrentBoard, (state, { currentBoard }): IStore => ({ ...state, currentBoard: currentBoard })),
  on(StoreActions.updateBoard, (state, { board }): IStore => {
    const boardIndex = state.boards.findIndex((item) => item.id === board.id);
    const updateBoards = [...state.boards];
    updateBoards[boardIndex] = board;
    return {
      ...state,
      boards: updateBoards,
    };
  })
);
