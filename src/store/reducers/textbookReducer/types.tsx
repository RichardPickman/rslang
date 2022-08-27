
import { IWord } from '../../../types/types';

export enum TextbookActionsEnum {
  SET_WORDS = 'set_words',
  SET_MODE = 'set_mode',
}

export interface ISetWordsAction {
  type: TextbookActionsEnum.SET_WORDS,
  payload: IWord[],
}

export type TextbookActions = ISetWordsAction;