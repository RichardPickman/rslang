import WordService from "../../services/wordService";
import { IUserWord, UserWordBody } from "../../types/types";
import _ from 'lodash';

class WordsActions {
  static addToDifficultWords = async ({ wordId, userId, token }: addToDifficultWords) => {
    try {
      const response = await WordsActions.isUserWord({ wordId, userId, token });
      if (response.isUserWord) {
        await WordsActions.updateUserWord(
          {
            wordId, userId, token,
            updatePath: 'optional.isDifficult',
            updateValue: 'true',
            userWord: response.uWord as IUserWord,
          }
        );
      } else {
        const body: UserWordBody = {
          optional: {
            isDifficult: 'true',
          }
        }
        WordsActions.createUserWord({ wordId, userId, token, body });
      }
    }
    catch (err) {
      throw new Error('Ooops! The word was not added to diffcult words.');
    }
  }

  static addToLearnedWords = async ({ wordId, userId, token }: addToLearnedWords) => {
    try {
      const response = await WordsActions.isUserWord({ wordId, userId, token });
      if (response.isUserWord) {
        await WordsActions.updateUserWord(
          {
            wordId, userId, token,
            updatePath: 'optional.isLearned',
            updateValue: 'true',
            userWord: response.uWord as IUserWord,
          }
        );
      } else {
        const body: UserWordBody = {
          optional: {
            isLearned: 'true',
          }
        }
        WordsActions.createUserWord({ wordId, userId, token, body });
      }
    }
    catch (err) {
      throw new Error('Ooops! The word was not added to learned words.');
    }
  }


  static removeFromDifficultWords = async ({ wordId, userId, token }: removeFromDifficultWords) => {
    try {
      const response = await WordsActions.isUserWord({ wordId, userId, token });
      if (response.isUserWord) {
        await WordsActions.updateUserWord(
          {
            wordId, userId, token,
            updatePath: 'optional.isDifficult',
            updateValue: 'false',
            userWord: response.uWord as IUserWord,
          }
        );
      }
    }
    catch (err) {
      throw new Error('Ooops! The word was not removed from diffcult words.');
    }
  }

  static removeFromLearnedWords = async ({ wordId, userId, token }: removeFromLearnedWords) => {
    try {
      const response = await WordsActions.isUserWord({ wordId, userId, token });
      if (response.isUserWord) {
        await WordsActions.updateUserWord(
          {
            wordId, userId, token,
            updatePath: 'optional.isLearned',
            updateValue: 'false',
            userWord: response.uWord as IUserWord,
          }
        );
      }
    }
    catch (err) {
      throw new Error('Ooops! The word was not removed from learned words.');
    }
  }

  static isUserWord = async ({ wordId, userId, token }: isUserWordParams): Promise<isUserWordReturnValue> => {
    try {
      const uWord = await WordService.getUserWord({ userId, wordId, token });
      return {
        isUserWord: true,
        uWord,
      };
    } catch {
      return {
        isUserWord: false,
      };
    }
  }

  static updateUserWord = async ({
    wordId,
    userId,
    token,
    userWord,
    updatePath,
    updateValue
  }: updateUserWordParams): Promise<void> => {
    try {
      const userWordBody: UserWordBody = {
        difficulty: userWord.difficulty,
        optional: userWord.optional,
      }
      const body = _.set(userWordBody, updatePath, updateValue);
      await WordService.updateUserWord({ userId, wordId, token, body });
    } catch {
      throw new Error('Ooops! The word was not updated.');
    }
  }

  static createUserWord = async ({ wordId, userId, token, body }: createUserWordParams) => {
    try {
      await WordService.createUserWord({ userId, wordId, body, token });
    }
    catch {
      throw new Error('Ooops! User word was not created.');
    }
  }
}

interface addToDifficultWords {
  wordId: string,
  userId: string,
  token: string,
}

type removeFromDifficultWords = addToDifficultWords;
type addToLearnedWords = addToDifficultWords;
type removeFromLearnedWords = addToLearnedWords;

interface createUserWordParams {
  wordId: string,
  userId: string,
  token: string,
  body: UserWordBody,
}

interface isUserWordParams {
  wordId: string,
  userId: string,
  token: string,
};

interface updateUserWordParams {
  wordId: string,
  userId: string,
  token: string,
  updatePath: string,
  updateValue: string | {},
  userWord: IUserWord,
}

interface isUserWordReturnValue {
  isUserWord: boolean,
  uWord?: IUserWord;
}
export default WordsActions;