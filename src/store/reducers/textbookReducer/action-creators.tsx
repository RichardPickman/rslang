import { IWord } from "../../../types/types"
import { ISetWordsAction, TextbookActionsEnum } from "./types"

const setWordsAction = (payload: IWord[]): ISetWordsAction => {
  return {type: TextbookActionsEnum.SET_WORDS, payload }
}

export const TextbookActionCreators = {
  setWordsAction,
}