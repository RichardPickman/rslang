/* eslint-disable no-restricted-globals */
import _ from "lodash";
import { Dispatch, SetStateAction } from "react";
import Modal from "../../../components/ui/Modal";
import { RouteNames } from "../../../router";
import { IUser, DisplayedWord } from "../../../types/types";
import { IWord } from '../../../types/types';
import WordsActions from "../wordsActions";

interface addProps {
  id: string,
  word: string,
  user: IUser,
  words: DisplayedWord[],
  setIsProcessing: Dispatch<SetStateAction<boolean>>,
}

interface removeProps {
  id: string,
  word: string,
  user: IUser,
  words: DisplayedWord[],
  setIsProcessing: Dispatch<SetStateAction<boolean>>,
  setDictWords: Dispatch<SetStateAction<DisplayedWord[]>>,
  setSelectedWord: Dispatch<SetStateAction<DisplayedWord | null>>
}

class DictionaryActions {
  static addToDifficultWords = ({ id, word, user, words, setIsProcessing }: addProps) => {
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
  }

  static removeFromDifficultWords = ({ id, word, user, words, setIsProcessing, setDictWords, setSelectedWord }: removeProps) => {
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
        if (location.pathname.includes(RouteNames.USER_DICTIONATY)) {
           setDictWords(words.filter((w) => w.word.id !== id));
        }
        setSelectedWord(null);
      })
      .catch(() => Modal.showErrorModal(`Произошла ошибка. Слово ${word} не было удалено из раздела "Сложные слова"`))
      .finally(() => {
        setIsProcessing((prev) => !prev)
      });
  }
}

export default DictionaryActions;
