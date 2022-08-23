import jwt from 'jsonwebtoken';
import { v4 as uuid } from 'uuid';
import errors from '../../Errors/appErrors';
import * as tokenRepo from '../../Controller/Token';
import settings from '../../common/config';

export const refresh = async (userId: string, tokenId: string) => {
  const token = await tokenRepo.get(userId, tokenId);
  if (Date.now() > token.expire) {
    throw new errors.AUTHENTICATION_ERROR('Token is expired');
  }

  return getTokens(userId);
};

export const getTokens = async (userId: string) => {
  const token = jwt.sign({ id: userId }, settings.JWT_SECRET_KEY as string, {
    expiresIn: settings.JWT_EXPIRE_TIME
  });

  const tokenId = uuid();
  const refreshToken = jwt.sign(
    { id: userId, tokenId },
    settings.JWT_REFRESH_SECRET_KEY as string,
    {
      expiresIn: settings.JWT_REFRESH_EXPIRE_TIME
    }
  );

  await tokenRepo.upsert({
    userId,
    tokenId,
    expire: Date.now() + settings.JWT_REFRESH_EXPIRE_TIME * 1000
  });

  return { token, refreshToken };
};

export const upsert = (token: Record<string, unknown>) =>
  tokenRepo.upsert(token);
