import * as wordRepo from "../../Controller/UserWords";

export const getAll = async (userId: string) => wordRepo.getAll(userId);

export const get = async (wordId: string, userId: string) => wordRepo.get(wordId, userId);

export const save = async (wordId: string, userId: string, userWord: Record<string, unknown>) =>
    wordRepo.save(wordId, userId, { wordId, userId, ...userWord });

export const update = async (wordId: string, userId: string, userWord: Record<string, unknown>) =>
    wordRepo.update(wordId, userId, { wordId, userId, ...userWord });

export const remove = async (wordId: string, userId: string) => wordRepo.remove(wordId, userId);
