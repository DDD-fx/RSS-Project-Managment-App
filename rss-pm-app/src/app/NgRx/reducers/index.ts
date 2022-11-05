import { ActionReducerMap, createReducer, MetaReducer, on } from '@ngrx/store';
import { environment } from '../../../environments/environment';
import { makeIsloggedFalse, makeIsloggedTrue, addUserName, removeUserName } from '../actions/storeActions';
import { IStore } from '../interfaces/store.interface';

export interface State {}

export const reducers: ActionReducerMap<State> = {};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];

export const Store: IStore = {
  isLogged: false,
  userName: null,
};

export const storeReducer = createReducer(
  Store,
  on(makeIsloggedTrue, (state: any): IStore => ({ ...state, isLogged: true })),
  on(makeIsloggedFalse, (state: any): IStore => ({ ...state, isLogged: false })),
  on(addUserName, (state: any): IStore => ({ ...state, userName: localStorage.getItem('rsspmapp7502.userName') })),
  on(removeUserName, (state: any): IStore => ({ ...state, userName: null }))
);
