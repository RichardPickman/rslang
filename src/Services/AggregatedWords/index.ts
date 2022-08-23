import * as wordRepo from '../../Controller/AggregatedWords';

export const getAll = async (
  userId: string,
  group: number,
  page: number,
  perPage: number,
  filter: Record<string, number>
) => wordRepo.getAll(userId, group, page, perPage, filter);

export const get = async (wordId: string, userId: string) =>
  wordRepo.get(wordId, userId);
