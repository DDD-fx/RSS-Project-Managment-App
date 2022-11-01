export interface ISignUpReq {
  name: string;
  login: string;
  password: string;
}

export interface ISignUpResp {
  id: string;
  name: string;
  login: string;
}

export interface ISignInReq {
  login: string;
  password: string;
}

export interface ISignInResp {
  token: string;
}

export enum EHttpStatus {
  'OK' = 200,
  'Created' = 201,
  'NoContent' = 204,
  'Unauthorized' = 401,
  'NotFound ' = 404,
  'UserExists ' = 409,
}
