
import { IWords } from '../../../types/types';

export enum TextbookActionsEnum {
  SET_WORDS = 'set_words',
}

export interface setWordsAction {
  type: TextbookActionsEnum.SET_WORDS,
  payload: IWords[],
}

export type TextbookActions = setWordsAction;