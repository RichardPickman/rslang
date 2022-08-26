import Token from '../../Models/Token';

export const get = async (userId: string, tokenId?: string) => {
  const token = await Token.findOne({ userId, tokenId });
  return token;
};

export const upsert = async (token: Record<string, unknown>) =>
  Token.findOneAndUpdate(
    { userId: token.userId },
    { $set: token },
    { upsert: true, new: true }
  );
