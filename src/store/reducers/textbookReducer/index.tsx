import { units } from "../../../data/constants";
import { IUnit, IWord, UserDictNavItem } from "../../../types/types";
import { TextbookActions } from "./types";
import { TextbookActionsEnum } from "./types"
import { UserDictNavItems } from '../../../data/constants';

interface TextbookState {
  units: IUnit[],
  words: IWord[],
  group: number,
  page: number,
  dictionarySections: UserDictNavItem[],
}
const initialState: TextbookState = {
  units,
  words: [],
  group: 0,
  page: 1,
  dictionarySections: UserDictNavItems,
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