import { GamePhase, GameWord, IWord, StatItem } from '../../../types/types';

export enum GameActionsEnum {
  SET_FETCHED_WORDS = 'set_words',
  SET_PHASE = 'set_phase',
  SET_POINTS = 'set_points',
  SET_GAME_WORDS = 'set_game_words',
  SET_LEARNED_WORD = 'set_learned_words',
  SET_FAILED_WORD = 'set_failed_words',
  RESET_LEARNED_WORDS = 'reset_learned_words',
  RESET_FAILED_WORDS = 'reset_failed_words',
  SET_MAX_SEQUENCE = 'set_max_sequence',
  SET_DAILY_STATISTICS = 'set_daily_statistics',
  SET_USED_WORDS = 'set_used_words',
  SET_PERCENTAGE = 'set_percentage',
}

export interface ISetFetchedWordsAction {
  type: GameActionsEnum.SET_FETCHED_WORDS,
  payload: IWord[],
}

export interface ISetPhaseAction {
  type: GameActionsEnum.SET_PHASE,
  payload: GamePhase,
}

export interface ISetPointsAction {
  type: GameActionsEnum.SET_POINTS,
  payload: number,
}

export interface ISetGameWordsAction {
  type: GameActionsEnum.SET_GAME_WORDS,
  payload: GameWord[],
}

export interface ISetLearnedWordAction {
  type: GameActionsEnum.SET_LEARNED_WORD,
  payload: IWord,
}

export interface ISetFailedWordAction {
  type: GameActionsEnum.SET_FAILED_WORD,
  payload: IWord,
}

export interface IResetLearnedWordsAction {
  type: GameActionsEnum.RESET_LEARNED_WORDS,
  payload: null,
}

export interface IResetFailedWordsAction {
  type: GameActionsEnum.RESET_FAILED_WORDS,
  payload: null,
}

export interface ISetMaxSequence {
  type: GameActionsEnum.SET_MAX_SEQUENCE,
  payload: number,
}

export interface ISetDailyStatistics {
  type: GameActionsEnum.SET_DAILY_STATISTICS,
  payload: StatItem,
}

export interface ISetUsedWords {
  type: GameActionsEnum.SET_USED_WORDS,
  payload: string[],
}

export interface ISetPercentageAction {
  type: GameActionsEnum.SET_PERCENTAGE,
  payload: number,
}

export type GameActions = ISetFetchedWordsAction |
ISetPhaseAction |
ISetPointsAction |
ISetGameWordsAction |
ISetLearnedWordAction |
ISetFailedWordAction |
IResetLearnedWordsAction |
IResetFailedWordsAction |
ISetMaxSequence |
ISetDailyStatistics |
ISetUsedWords |
ISetPercentageAction;