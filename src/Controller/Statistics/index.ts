import Statistics from '../../Models/Statistics';

export const get = async (userId: string) => {
  const statistic = await Statistics.findOne({ userId });

  return statistic;
};

export const upsert = async (
  userId: string,
  statistic: Record<string, unknown>
) =>
  Statistics.findOneAndUpdate(
    { userId },
    { $set: statistic },
    { upsert: true, new: true }
  );

export const remove = async (userId: string) =>
  Statistics.deleteOne({ userId });
