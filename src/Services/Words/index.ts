import * as wordRepo from "../../Controller/Words";

export const getAll = async (conditions: Record<string, unknown>) => wordRepo.getAll(conditions);

export const get = async (wordId: string) => {
    const word = await wordRepo.get(wordId);

    return word;
};
