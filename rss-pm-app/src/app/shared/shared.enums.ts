export enum EHttpStatus {
  'OK' = 200,
  'Created' = 201,
  'NoContent' = 204,
  'BadRequest' = 400,
  'Unauthorized' = 401,
  'Forbidden' = 403,
  'NotFound' = 404,
  'UserExists' = 409,
  'InternalServerError' = 500,
}

export enum EApiUrls {
  'signin' = 'signin',
  'signup' = 'signup',
  'users' = 'users',
  'boards' = 'boards',
  'columns' = 'columns',
  'tasks' = 'tasks',
}

export enum ESiteUrls {
  'signIn' = 'signIn',
  'signUp' = 'signUp',
  'userEdit' = 'userEdit',
  'boards' = 'boards',
  'columns' = 'columns',
  'tasks' = 'tasks',
  'welcome' = 'welcome',
  'p404' = 'p404',
}

export enum ELocalStorage {
  'token' = 'rsspmapp7502.token',
  'login' = 'rsspmapp7502.login',
  'userName' = 'rsspmapp7502.userName',
  'userId' = 'rsspmapp7502.userId',
}
