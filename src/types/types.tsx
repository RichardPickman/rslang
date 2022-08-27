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
  wordTranslate: string,
  _id?: string,
  isDifficult?: boolean,
}

export interface IUnit {
  id: string,
  name: string,
  description: string,
  type: SectionEnum,
}

export interface loginParams {
  email: string,
  password: string,
}

export interface IUser {
  id: string,
  email: string,
  name: string,
  token: string,
  refreshToken: string,
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

export enum DifficultyLevelEnum {
  DIFFICULT = 'difficult',
}

export interface IUserWord {
  difficulty: string,
  optional: {[key: string]: string | boolean},
}

export interface createUserWordParams {
  userId: string, 
  wordId: string, 
  word: IUserWord,
  token: string, 
}

export interface deleteUserWordParams {
  userId: string, 
  wordId: string, 
  token: string, 
}

export enum SectionEnum {
  UNIT = 'unit',
  DIFFICULT_WORDS = 'difficult_words',
  LEARNED_WORDS = 'learned_words',
}

export interface UserDictNavItem {
  id: string,
  name: string,
  type: SectionEnum,
}

export interface getAggregatedWordsParams {
  userId: string, 
  token: string, 
  filter: string,
  group?: string,
  page?: string,
}

export type getAggregatedWordsResponse = [
  {
    paginatedResults: IWord[],
    totalCount: [{count: number}]
  }
]
