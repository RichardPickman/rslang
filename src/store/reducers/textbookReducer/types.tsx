
import { IWord } from '../../../types/types';

export enum TextbookActionsEnum {
  SET_WORDS = 'set_words',
}

export interface ISetWordsAction {
  type: TextbookActionsEnum.SET_WORDS,
  payload: IWord[],
}

export type TextbookActions = ISetWordsAction;