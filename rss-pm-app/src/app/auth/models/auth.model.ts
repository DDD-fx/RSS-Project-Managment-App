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
