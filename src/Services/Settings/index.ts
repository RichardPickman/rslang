import * as settingRepo from "../../Controller/Settings";

export const get = async (userId: string) => settingRepo.get(userId);

export const upsert = async (userId: string, statistic: Record<string, unknown>) =>
    settingRepo.upsert(userId, { userId, ...statistic });

export const remove = async (userId: string) => settingRepo.remove(userId);
