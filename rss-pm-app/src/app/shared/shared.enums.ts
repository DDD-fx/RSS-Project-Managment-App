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
}

export enum ENotificationSources {
  'signIn',
  'signUp',
}

export enum ELocalStorage {
  'token' = 'token',
  'userName' = 'userName',
  'userId' = 'userId',
}
