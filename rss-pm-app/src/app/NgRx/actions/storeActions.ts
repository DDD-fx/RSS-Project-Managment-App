import { createAction } from '@ngrx/store';

export const makeIsloggedTrue = createAction('[Store] Make isLogged true');
export const makeIsloggedFalse = createAction('[Store] Make isLogged false');
export const addUserName = createAction('[Store] Add User Name');
export const removeUserName = createAction('[Store] Remove User Name');
