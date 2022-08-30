import { GameActions, GameActionsEnum, 
  IResetFailedWordsAction, 
  IResetLearnedWordsAction, 
  ISetFailedWordAction, 
  ISetGameWordsAction,
  ISetLearnedWordAction,
  ISetPhaseAction, 
  ISetPointsAction, 
  ISetWordsAction,   
} from "./types";

import { GamePhase, GameWord, IWord } from '../../../types/types';
import { Dispatch } from "react";

const setWordsAction = (payload: IWord[]): ISetWordsAction => {
  return { type: GameActionsEnum.SET_WORDS, payload };
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

const reset = () => {
  return (dispatch: Dispatch<GameActions>) => {
    dispatch(resetLearnedWord());
    dispatch(resetFailedWord());
    dispatch(setPointsAction(0));
  }
}

export const GameActionCreators = {
  setGameWordsAction,
  setPhaseAction,
  setPointsAction,
  setWordsAction,
  setLearnedWord,
  setFailedWord,
  reset,
}
