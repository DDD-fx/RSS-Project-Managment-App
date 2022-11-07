export enum EHttpStatus {
  'OK' = 200,
  'Created' = 201,
  'NoContent' = 204,
  'Unauthorized' = 401,
  'Forbidden' = 403,
  'NotFound' = 404,
  'UserExists' = 409,
}

export enum EApiUrls {
  'signin' = 'signin',
  'signup' = 'signup',
  'users' = 'users',
  'boards' = 'boards',
}

export enum ESiteUrls {
  'signIn' = 'signIn',
  'signUp' = 'signUp',
  'userEdit' = 'userEdit',
  'boards' = 'boards',
}

export enum ELocalStorage {
  'token' = 'rsspmapp7502.token',
  'login' = 'rsspmapp7502.login',
  'userName' = 'rsspmapp7502.userName',
  'userId' = 'rsspmapp7502.userId',
}
