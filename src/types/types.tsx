export interface IWord {
  id: string,
  group: string,
  page: string,
  word: string,
  image: string,
  audio: string,
  audioMeaning: string,
  audioExample: string,
  textMeaning: string,
  textExample: string,
  transcription: string,
  textExampleTranslate: string,
  textMeaningTranslate: string,
  wordTranslate: string
}

export interface IUnit {
  id: string,
  name: string,
  description: string,
}

export interface loginParams {
  email: string,
  password: string,
}

export interface IUser {
  email: string,
  name: string,
}

export interface CreateUserResponse {
  id: string,
  name: string,
  email: string,
}

export interface SignInResponse {
  message: string,
  token: string,
  refreshToken: string,
  userId: string
}
export type GetTokenResponse = SignInResponse;
export type UserAuthData = Omit<SignInResponse, 'message'>;

export interface IUserData {
  name: string,
  email: string,
  password: string,
}

export interface GetUserResponse {
  name: string,
  email: string,
  password: string,
}

export interface LoginValues {
  email: string,
  password: string,
};

export enum ErrorsEnum {
  UNAUTHORIZED = '401',
  INCORRECT_VALUES = '403',
  EMAIL_EXISTS = '417',
};

export interface GetUserRequest {
  token: string,
  userId: string,
};

export interface SignupValues {
  name: string,
  email: string,
  password: string,
};
