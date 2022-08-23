import UserWord from '../../Models/UserWord';
import errors from '../../Errors/appErrors';
import { TypedError } from '../../Types';
const ENTITY_NAME = 'user word';
const MONGO_ENTITY_EXISTS_ERROR_CODE = 11000;

export const getAll = async (userId: string) => UserWord.find({ userId });

export const get = async (wordId: string, userId: string) => {
  const userWord = await UserWord.findOne({ wordId, userId });
  if (!userWord) {
    throw new errors.NOT_FOUND_ERROR(ENTITY_NAME, { wordId, userId });
  }

  return userWord;
};

export const save = async (
  wordId: string,
  userId: string,
  userWord: Record<string, unknown>
) => {
  try {
    return await UserWord.create(userWord);
  } catch (err) {
    if (err instanceof Error) {
      if ((err as TypedError).code === MONGO_ENTITY_EXISTS_ERROR_CODE) {
        throw new errors.ENTITY_EXISTS(`such ${ENTITY_NAME} already exists`);
      } else {
        throw err;
      }
    }
  }
};

export const update = async (
  wordId: string,
  userId: string,
  userWord: Record<string, unknown>
) => {
  const updatedWord = await UserWord.findOneAndUpdate(
    { wordId, userId },
    { $set: userWord },
    { new: true }
  );
  if (!updatedWord) {
    throw new errors.NOT_FOUND_ERROR(ENTITY_NAME, { wordId, userId });
  }

  return updatedWord;
};

export const remove = async (wordId: string, userId: string) =>
  UserWord.deleteOne({ wordId, userId });
