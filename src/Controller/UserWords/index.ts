import UserWord from '../../Models/UserWord';

import { TypedError } from '../../Types';

export const getAll = async (userId: string) =>
  await UserWord.find({ userId }).exec();

export const get = async (wordId: string, userId: string) =>
  await UserWord.findOne({ wordId, userId });

export const save = async (
  wordId: string,
  userId: string,
  userWord: Record<string, unknown>
) => {
  try {
    return await UserWord.create({ wordId, userId, userWord });
  } catch (err) {
    return null;
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

  return updatedWord;
};

export const remove = async (wordId: string, userId: string) =>
  UserWord.deleteOne({ wordId, userId });
