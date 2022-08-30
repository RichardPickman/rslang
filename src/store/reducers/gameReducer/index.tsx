import { GamePhase, GameWord, IWord } from "../../../types/types";
import { GameActions, GameActionsEnum } from "./types";

export interface GameState {
  words: IWord[],
  gameWords: GameWord[],
  phase: GamePhase,
  points: number,
  learnedWords: IWord[],
  failedWords: IWord[],
}

const initialState: GameState = {
  words: [],
  gameWords: [],
  phase: GamePhase.INIT,
  points: 0,
  learnedWords: [],
  failedWords: [],
};

const GameReducer = (state: GameState = initialState, action: GameActions) => {
  switch (action.type) {
    case (GameActionsEnum.SET_WORDS): {
      return { ...state, words: action.payload }
    }
    case (GameActionsEnum.SET_GAME_WORDS): {
      return { ...state, gameWords: action.payload }
    }
    case (GameActionsEnum.SET_PHASE): {
      return { ...state, phase: action.payload }
    }
    case (GameActionsEnum.SET_POINTS): {
      return { ...state, points: action.payload }
    }
    case (GameActionsEnum.SET_LEARNED_WORD): {
      return { ...state, learnedWords: [...state.learnedWords, action.payload] }
    }
    case (GameActionsEnum.SET_FAILED_WORD): {
      return { ...state, failedWords: [...state.failedWords, action.payload] }
    }
    case (GameActionsEnum.RESET_FAILED_WORDS): {
      return { ...state, failedWords: [] }
    }
    case (GameActionsEnum.RESET_LEARNED_WORDS): {
      return { ...state, learnedWords: [] }
    }
    default:
      return state;
  }
}

export default GameReducer;