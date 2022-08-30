import Settings from '../../Models/Settings';

export const get = async (userId: string) => {
  const setting = await Settings.findOne({ userId });

  return setting;
};

export const upsert = async (
  userId: string,
  setting: Record<string, unknown>
) =>
  Settings.findOneAndUpdate(
    { userId },
    { $set: setting },
    { upsert: true, new: true }
  );

export const remove = async (userId: string) => Settings.deleteOne({ userId });
