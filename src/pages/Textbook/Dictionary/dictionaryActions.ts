/* eslint-disable no-restricted-globals */
import _ from "lodash";
import { Dispatch, SetStateAction } from "react";
import Modal from "../../../components/ui/Modal";
import { RouteNames } from "../../../router";
import { IUser, DisplayedWord } from "../../../types/types";
import { IWord } from '../../../types/types';
import WordsActions from "../wordsActions";

interface actionParams {
  id: string,
  word: string,
  user: IUser,
}

export const getDictActions = ({ setIsProcessing, words, setDictWords, setSelectedWord }: getDictActionsParams) => {
  return {
    addToDifficultWords: ({ id, word, user }: actionParams) => {
      WordsActions.addToDifficultWords({
        wordId: id,
        userId: (user as IUser).id,
        token: (user as IUser).token,
      })
        .then(() => {
          words.forEach((w) => {
            if (w.word.id === id) {
              _.set(w, 'userWord.optional.isDifficult', 'true');
            }
          });
          Modal.showSuccessModal(`Слово ${word} добавлено в раздел "Сложные слова"`);
        })
        .catch(() => {
          Modal.showErrorModal(`Произошла ошибка. Слово ${word} не было добавлено в раздел "Сложные слова"`);
        })
        .finally(() => {
          setIsProcessing((prev) => !prev)
        });
    },

    removeFromDifficultWords: ({ id, word, user }: actionParams) => {
      WordsActions.removeFromDifficultWords({
        wordId: id,
        userId: (user as IUser).id,
        token: (user as IUser).token,
      })
        .then(() => {
          Modal.showSuccessModal(`Слово ${word} удалено из раздела "Сложные слова"`);
          words.forEach((w) => {
            if (w.word.id === id) {
              _.set(w, 'userWord.optional.isDifficult', 'false');
            }
          });
          if (location.pathname.includes(RouteNames.DIFFICULT_WORDS)) {
            setDictWords(words.filter((w) => w.word.id !== id));
            setSelectedWord(null);
          }
        })
        .catch(() => Modal.showErrorModal(`Произошла ошибка. Слово ${word} не было удалено из раздела "Сложные слова"`))
        .finally(() => {
          setIsProcessing((prev) => !prev)
        });
    },

    addToLearnedWords: ({ id, word, user }: actionParams) => {
      WordsActions.addToLearnedWords({
        wordId: id,
        userId: (user as IUser).id,
        token: (user as IUser).token,
      })
        .then(() => {
          words.forEach((w) => {
            if (w.word.id === id) {
              _.set(w, 'userWord.optional.isLearned', 'true');
            }
          });
          Modal.showSuccessModal(`Слово ${word} добавлено в раздел "Изученные слова"`);
        })
        .catch(() => {
          Modal.showErrorModal(`Произошла ошибка. Слово ${word} не было добавлено в раздел "Изученные слова"`);
        })
        .finally(() => {
          setIsProcessing((prev) => !prev)
        });
    },

    removeFromLearnedWords: ({ id, word, user }: actionParams) => {
      WordsActions.removeFromLearnedWords({
        wordId: id,
        userId: (user as IUser).id,
        token: (user as IUser).token,
      })
        .then(() => {
          Modal.showSuccessModal(`Слово ${word} удалено из раздела "Изученные слова"`);
          words.forEach((w) => {
            if (w.word.id === id) {
              _.set(w, 'userWord.optional.isLearned', 'false');
            }
          });
          if (location.pathname.includes(RouteNames.LEARNED_WORDS)) {
            setDictWords(words.filter((w) => w.word.id !== id));
            setSelectedWord(null);
          }
        })
        .catch(() => Modal.showErrorModal(`Произошла ошибка. Слово ${word} не было удалено из раздела "Изученные слова"`))
        .finally(() => {
          setIsProcessing((prev) => !prev)
        });
    }
  }
}

interface getDictActionsParams {
  setIsProcessing: Dispatch<SetStateAction<boolean>>,
  words: DisplayedWord[],
  setDictWords: Dispatch<SetStateAction<DisplayedWord[]>>,
  setSelectedWord: Dispatch<SetStateAction<DisplayedWord | null>>,
}

export interface getDictActionsType {
  addToDifficultWords: ({ id, word, user }: actionParams) => void,
  removeFromDifficultWords: ({ id, word, user }: actionParams) => void,
  addToLearnedWords: ({ id, word, user }: actionParams) => void,
  removeFromLearnedWords: ({ id, word, user }: actionParams) => void,
}

