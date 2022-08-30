import { GamePhase, GameWord, IWord } from '../../../types/types';

export enum GameActionsEnum {
  SET_WORDS = 'set_words',
  SET_PHASE = 'set_phase',
  SET_POINTS = 'set_points',
  SET_GAME_WORDS = 'set_game_words',
  SET_LEARNED_WORD = 'set_learned_words',
  SET_FAILED_WORD = 'set_failed_words',
  RESET_LEARNED_WORDS = 'reset_learned_words',
  RESET_FAILED_WORDS = 'reset_failed_words',
}

export interface ISetWordsAction {
  type: GameActionsEnum.SET_WORDS,
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

export type GameActions = ISetWordsAction |
ISetPhaseAction |
ISetPointsAction |
ISetGameWordsAction |
ISetLearnedWordAction |
ISetFailedWordAction |
IResetLearnedWordsAction |
IResetFailedWordsAction;