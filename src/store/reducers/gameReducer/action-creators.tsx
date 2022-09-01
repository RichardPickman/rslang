import { GameActions, GameActionsEnum, 
  IResetFailedWordsAction, 
  IResetLearnedWordsAction, 
  ISetDailyStatistics, 
  ISetFailedWordAction, 
  ISetGameWordsAction,
  ISetLearnedWordAction,
  ISetMaxSequence,
  ISetPhaseAction, 
  ISetPointsAction, 
  ISetFetchedWordsAction,
  ISetUsedWords,
  ISetPercentageAction,   
} from "./types";

import { GamePhase, GameWord, IWord, StatItem } from '../../../types/types';
import { Dispatch } from "react";

const setFetchedWordsAction = (payload: IWord[]): ISetFetchedWordsAction => {
  return { type: GameActionsEnum.SET_FETCHED_WORDS, payload };
}

const setGameWordsAction = (payload: GameWord[]): ISetGameWordsAction => {
  return { type: GameActionsEnum.SET_GAME_WORDS, payload };
}

const setPhaseAction = (payload: GamePhase): ISetPhaseAction => {
  return { type: GameActionsEnum.SET_PHASE, payload };
}

const setPointsAction = (payload: number): ISetPointsAction => {
  return { type: GameActionsEnum.SET_POINTS, payload };
}

const setPercentageAction = (payload: number): ISetPercentageAction => {
  return { type: GameActionsEnum.SET_PERCENTAGE, payload };
}

const setLearnedWord = (payload: IWord): ISetLearnedWordAction => {
  return { type: GameActionsEnum.SET_LEARNED_WORD, payload };
}

const setFailedWord = (payload: IWord): ISetFailedWordAction => {
  return { type: GameActionsEnum.SET_FAILED_WORD, payload };
}

const resetLearnedWord = (): IResetLearnedWordsAction => {
  return { type: GameActionsEnum.RESET_LEARNED_WORDS, payload: null };
}

const resetFailedWord = (): IResetFailedWordsAction => {
  return { type: GameActionsEnum.RESET_FAILED_WORDS, payload: null };
}

const setMaxSequence = (payload: number): ISetMaxSequence => {
  return { type: GameActionsEnum.SET_MAX_SEQUENCE, payload };
}

const setDailyStatistics = (payload: StatItem): ISetDailyStatistics => {
  return { type: GameActionsEnum.SET_DAILY_STATISTICS, payload };
}

const setUsedWords = (payload: string[]): ISetUsedWords => {
  return { type: GameActionsEnum.SET_USED_WORDS, payload };
}

const reset = () => {
  return (dispatch: Dispatch<GameActions>) => {
    dispatch(resetLearnedWord());
    dispatch(resetFailedWord());
    dispatch(setPointsAction(0));
    dispatch(setMaxSequence(0));
  }
}

export const GameActionCreators = {
  setGameWordsAction,
  setPhaseAction,
  setPointsAction,
  setFetchedWordsAction,
  setLearnedWord,
  setFailedWord,
  setMaxSequence,
  setDailyStatistics,
  setUsedWords,
  setPercentageAction,
  reset,
}
