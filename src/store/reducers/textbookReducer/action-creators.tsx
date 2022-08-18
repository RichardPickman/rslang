import { IWord } from "../../../types/types"
import { TextbookActionsEnum } from "./types"

export const setWordsAction = (payload: IWord[]) => {
  return {type: TextbookActionsEnum.SET_WORDS, payload }
}
