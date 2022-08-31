import { units } from "../../../data/constants";
import { IUnit, IWord, UserDictNavItem } from "../../../types/types";
import { TextbookActions } from "./types";
import { TextbookActionsEnum } from "./types"
import { UserDictNavItems } from '../../../data/constants';

interface TextbookState {
  units: IUnit[],
  words: IWord[],
  unit: string,
  page: string,
  dictionarySections: UserDictNavItem[],
}
const initialState: TextbookState = {
  units,
  words: [],
  unit: '0',
  page: '0',
  dictionarySections: UserDictNavItems,
};

const TextbookReducer = (state: TextbookState = initialState, action: TextbookActions) => {
  switch (action.type) {
    case (TextbookActionsEnum.SET_WORDS): {
      return { ...state, words: [...action.payload] }
    }
    case (TextbookActionsEnum.SET_CURRENT_PAGE): {
      return { ...state, page: action.payload }
    }
    case (TextbookActionsEnum.SET_CURRENT_UNIT): {
      return { ...state, unit: action.payload }
    }
    default:
      return state;
  }
}

export default TextbookReducer;