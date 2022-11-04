import { IGetAllUsersResp } from '../api/models/api-user.model';
import { ISignUpResp } from '../auth/models/auth.model';
import { ELocalStorage } from './shared.enums';
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
  if (param === 'id') {
    return new HttpParams({
      fromObject: { id: getUserId() },
    });
  }
  return new HttpParams({});
}
