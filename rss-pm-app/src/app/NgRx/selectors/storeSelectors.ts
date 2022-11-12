import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IStore } from '../interfaces/store.interface';

const selectFeature = createFeatureSelector<IStore>('store');
export const selectIsLogged = createSelector(selectFeature, (state) => state.isLogged);
export const selectUserName = createSelector(selectFeature, (state) => state.userName);

export const selectAllBoards = createSelector(selectFeature, (state) => state.isLoading);
export const selectAllBoardsSuccess = createSelector(selectFeature, (state) => state.boards);
export const selectAllBoardsFailure = createSelector(selectFeature, (state) => state.error);
export const selectCurrentBoard = createSelector(selectFeature, (state) => state.currentBoard);
export const selectUpdateBoard = (props: { boardId: string }) =>
  createSelector(selectAllBoardsSuccess, (boards) => boards.find((board) => board.id === props.boardId));
