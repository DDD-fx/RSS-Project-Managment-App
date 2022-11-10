import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IStore } from '../interfaces/store.interface';

const selectFeature = createFeatureSelector<IStore>('store');
export const selectIsLogged = createSelector(selectFeature, (state) => state.isLogged);
export const selectUserName = createSelector(selectFeature, (state) => state.userName);
export const selectAllBoards = createSelector(selectFeature, (state) => state.boards);
export const selectCurrentBoard = createSelector(selectFeature, (state) => state.currentBoard);
