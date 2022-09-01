import { GamePhase, GameWord, IWord, StatItem } from "../../../types/types";
import { GameActions, GameActionsEnum } from "./types";

export interface GameState {
  fetchedWords: IWord[],
  gameWords: GameWord[],
  phase: GamePhase,
  points: number,
  learnedWords: IWord[],
  failedWords: IWord[],
  maxsequence: number,
  dailyStats: StatItem,
  date: string,
  usedWords: string[],
  percentage: number,
}

const initialState: GameState = {
  fetchedWords: [],
  gameWords: [],
  phase: GamePhase.INIT,
  points: 0,
  learnedWords: [],
  failedWords: [],
  maxsequence: 0,
  dailyStats: {
    newWords: [],
    percentage: 0,
    sequence: 0,
    gameWordsNum: 0,
    guessedWordsNum: 0,
  },
  date: new Date().toLocaleDateString('en-GB'),
  usedWords: [],
  percentage: 0,
};

const GameReducer = (state: GameState = initialState, action: GameActions) => {
  switch (action.type) {
    case (GameActionsEnum.SET_FETCHED_WORDS): {
      return { ...state, fetchedWords: action.payload }
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
    case (GameActionsEnum.SET_MAX_SEQUENCE): {
      return { ...state, maxsequence: action.payload }
    }
    case (GameActionsEnum.SET_DAILY_STATISTICS): {
      return { ...state, dailyStats: action.payload }
    }
    case (GameActionsEnum.SET_USED_WORDS): {
      return { ...state, usedWords: action.payload }
    }
    case (GameActionsEnum.SET_PERCENTAGE): {
      return { ...state, percentage: action.payload }
    }
    default:
      return state;
  }
}

export default GameReducer;