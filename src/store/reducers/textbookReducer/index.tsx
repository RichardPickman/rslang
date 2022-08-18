import { units } from "../../../data/constants";
import { IUnit, IWord } from "../../../types/types";
import { TextbookActions } from "./types";
import { TextbookActionsEnum } from "./types"

interface TextbookState {
  units: IUnit[],
  words: IWord[],
  group: number,
  page: number
}

const initialState: TextbookState = {
  units,
  words: [],
  group: 0,
  page: 1,
};

const TextbookReducer = (state: TextbookState = initialState, action: TextbookActions) => {
  switch (action.type) {
    case (TextbookActionsEnum.SET_WORDS): {
      return { ...state, words: [...action.payload] }
    }
    default:
      return state;
  }
}

export default TextbookReducer;