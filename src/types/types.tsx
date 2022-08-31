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

export interface DisplayedWord {
  word: IWord,
  userWord?: IUserWord,
}

export interface IUserWord {
  wordId: string,
  difficulty?: string,
  optional?: {
    isDifficult?: string,
    isLearned?: string,
    statistics?: wordStatistics,
  },
}

export type UserWordBody  = Omit<IUserWord, 'wordId'>;

export interface createUserWordParams {
  userId: string,
  wordId: string,
  body: Omit<IUserWord, 'wordId'>,
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
    paginatedResults: AggregatedWord[],
    totalCount: [{ count: number }]
  }
]

export enum GameMode {
  MENU_GAME = 'menu_game',
  UNIT_GAME = 'unit_game',
}

export enum GamePhase {
  INIT = 'init',
  STARTED = 'started',
  RUNNING = 'running',
  ON_FINISH = 'on_finish',
  FINISHED = 'finished',
}

export interface WordsPairs {
  rightPairs: { [key: string]: string }[],
  wrongPairs: { [key: string]: string }[],
}

export interface GameWord {
  id: string,
  word: string,
  translation: string,
  isRight: boolean,
}

export enum GameType {
  SPRINT = 'sprint',
}

export interface wordStatistics {
  sprint: {
    attempts: string,
    guessedNum: string,
    sequence: string,
  }
}

export interface updateUserWordParams {
  userId: string,
  wordId: string,
  body: UserWordBody,
  token: string,
}

export enum UpdateDataType {
  DIFFICULTY = 'difficulty',
  ON_STUDY = 'on_study',
  IS_DIFFICULT = 'is_difficult',
  STATS = 'statisctics',
}

export interface AggregatedWord extends IWord {
  _id: string,
  userWord: UserWordBody,
}