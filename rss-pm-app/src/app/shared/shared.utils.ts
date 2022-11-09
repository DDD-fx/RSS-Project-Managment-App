import { ISignUpResp } from '../auth/models/auth.model';
import { ELocalStorage } from './shared.enums';

interface IParseJWT {
  iat: number;
  login: string;
  userId: string;
}

function parseJwt(token: string): IParseJWT {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split('')
      .map((item) => '%' + ('00' + item.charCodeAt(0).toString(16)).slice(-2))
      .join('')
  );
  return JSON.parse(jsonPayload);
}

export function setUserIdToLs(): void {
  const token = localStorage.getItem(ELocalStorage.token);
  if (token) {
    const userId = parseJwt(token).userId;
    localStorage.setItem(ELocalStorage.userId, userId);
  } else throw new Error('User not found');
}

export function getUserIdFromLs(): string {
  const userId = localStorage.getItem(ELocalStorage.userId);
  if (userId) return userId;
  else throw new Error('User ID not found');
}

export function saveUserDataToLS(data: ISignUpResp) {
  localStorage.setItem(ELocalStorage.login, data.login);
  localStorage.setItem(ELocalStorage.userName, data.name);
  localStorage.setItem(ELocalStorage.userId, data.id);
}

// export function findUserByLogin(users: IGetAllUsersResp, login: string): ISignUpResp {
//   return users.find((item) => item.login === login)!;
// }
