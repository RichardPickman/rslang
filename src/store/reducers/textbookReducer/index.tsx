import { IWords } from "../../../types/types";
import { TextbookActions } from "./types";
import { TextbookActionsEnum } from "./types"

interface TextbookState {
  words: IWords[],
  group: number,
  page: number
}

const initialState: TextbookState = {
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