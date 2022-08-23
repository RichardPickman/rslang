import * as statisticRepo from "../../Controller/Statistics";

export const get = async (userId: string) => statisticRepo.get(userId);

export const upsert = async (userId: string, statistic: Record<string, unknown>) =>
    statisticRepo.upsert(userId, { ...statistic, userId });

export const remove = async (userId: string) => statisticRepo.remove(userId);
