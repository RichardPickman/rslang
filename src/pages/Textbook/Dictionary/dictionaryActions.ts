/* eslint-disable no-restricted-globals */
import { Dispatch, SetStateAction } from "react";
import Modal from "../../../components/ui/Modal";
import { RouteNames } from "../../../router";
import WordService from "../../../services/wordService";
import { IUser, DifficultyLevelEnum } from "../../../types/types";
import { IWord } from '../../../types/types';

interface addProps {
  id: string,
  word: string,
  user: IUser,
  words: IWord[],
  setIsProcessing: Dispatch<SetStateAction<boolean>>,
}

interface removeProps {
  id: string,
  word: string,
  user: IUser,
  words: IWord[],
  setIsProcessing: Dispatch<SetStateAction<boolean>>,
  setDictWords: Dispatch<SetStateAction<IWord[]>>,
  setSelectedWord: Dispatch<SetStateAction<IWord | null>>
}

class DictionaryActions {
  static addToDifficultWords = ({ id, word, user, words, setIsProcessing }: addProps) => {
    WordService
      .createUserWord(
        {
          userId: (user as IUser).id,
          wordId: id,
          word: { "difficulty": DifficultyLevelEnum.DIFFICULT, "optional": { testFieldString: 'test', testFieldBoolean: true } },
          token: (user as IUser).token
        }
      )
      .then(() => {
        words.forEach((w) => w.id === id || w._id === id ? w.isDifficult = true : null);
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
    WordService
      .deleteUserWord(
        {
          userId: (user as IUser).id,
          wordId: id,
          token: (user as IUser).token,
        }
      )
      .then(() => {
        Modal.showSuccessModal(`Слово ${word} удалено из раздела "Сложные слова"`);
        words.forEach((w) => w.id === id || w._id === id ? w.isDifficult = false : null);
        if (location.pathname.includes(RouteNames.USER_DICTIONATY)) {
          setDictWords(words.filter((w) => w._id !== id));
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
