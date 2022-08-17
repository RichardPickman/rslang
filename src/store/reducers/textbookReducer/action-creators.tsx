import { IWords } from "../../../types/types"
import { TextbookActionsEnum } from "./types"

export const setWordsAction = (payload: IWords[]) => {
  return {type: TextbookActionsEnum.SET_WORDS, payload }
}
