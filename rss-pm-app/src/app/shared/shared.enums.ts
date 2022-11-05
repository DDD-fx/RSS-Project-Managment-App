export enum EHttpStatus {
  'OK' = 200,
  'Created' = 201,
  'NoContent' = 204,
  'Unauthorized' = 401,
  'NotFound' = 404,
  'UserExists' = 409,
}

export enum EUrls {
  'signin' = 'signin',
  'signup' = 'signup',
  'users' = 'users',
  'boards' = 'boards',
}

export enum ENotificationSources {
  'signIn',
  'signUp',
  'boards',
}

export enum ELocalStorage {
  'token' = `rsspmapp7502.token`,
  'userName' = 'rsspmapp7502.userName',
  'userId' = 'rsspmapp7502.userId',
}

export enum EHttpParams {
  'userId' = 'userId',
  'boardId' = 'boardId',
}
