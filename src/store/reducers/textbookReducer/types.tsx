
import { IWord } from '../../../types/types';

export enum TextbookActionsEnum {
  SET_WORDS = 'set_words',
  SET_MODE = 'set_mode',
  SET_CURRENT_PAGE = 'set_current_page',
  SET_CURRENT_UNIT = 'set_current_unit',
}

export interface ISetWordsAction {
  type: TextbookActionsEnum.SET_WORDS,
  payload: IWord[],
}

export interface ISetCurrentPageAction {
  type: TextbookActionsEnum.SET_CURRENT_PAGE,
  payload: string,
}

export interface ISetCurrentUnitAction {
  type: TextbookActionsEnum.SET_CURRENT_UNIT,
  payload: string,
}

export type TextbookActions = ISetWordsAction |
ISetCurrentPageAction |
ISetCurrentUnitAction;