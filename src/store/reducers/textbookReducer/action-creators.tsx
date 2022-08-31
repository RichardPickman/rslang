import { IWord } from "../../../types/types"
import { ISetCurrentPageAction, ISetCurrentUnitAction, ISetWordsAction, TextbookActionsEnum } from "./types"

const setWordsAction = (payload: IWord[]): ISetWordsAction => {
  return {type: TextbookActionsEnum.SET_WORDS, payload }
}

const setCurrentPageAction = (payload: string): ISetCurrentPageAction => {
  return {type: TextbookActionsEnum.SET_CURRENT_PAGE, payload }
}

const setCurrentUnitAction = (payload: string): ISetCurrentUnitAction => {
  return {type: TextbookActionsEnum.SET_CURRENT_UNIT, payload }
}

export const TextbookActionCreators = {
  setWordsAction,
  setCurrentPageAction,
  setCurrentUnitAction,
}