import { IGetAllUsersResp } from '../api/models/api-user.model';
import { ISignUpResp } from '../auth/models/auth.model';
import { EHttpParams, ELocalStorage } from './shared.enums';
import { HttpParams } from '@angular/common/http';

export function findUserByLogin(users: IGetAllUsersResp, login: string): ISignUpResp {
  return users.find((item) => item.login === login)!;
}

export function getUserId(): string {
  const id = localStorage.getItem(ELocalStorage.userId);
  if (id) return id;
  else throw new Error('User not found');
}

export function createHttpParams(param: string) {
  switch (param) {
    case EHttpParams.userId:
      return new HttpParams({ fromObject: { id: getUserId() } });

    case EHttpParams.boardId:
      return new HttpParams({ fromObject: { id: getUserId() } }); //getBoardId

    default:
      return new HttpParams({});
  }
}
