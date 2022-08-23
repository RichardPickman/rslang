import bcrypt from 'bcrypt';

import * as usersRepo from '../../Controller/Users';
import * as tokenService from '../../Services/Token';
import * as settingsService from '../../Services/Settings';
import * as statisticService from '../../Services/Statistics';
import error from '../../Errors/appErrors';

export const authenticate = async (user: Record<string, unknown>) => {
  const userEntity = await usersRepo.getUserByEmail(user.email as string);

  const isValidated = bcrypt.compare(
    user.password as string,
    userEntity.password as string
  );
  if (!isValidated) {
    throw new error.AUTHENTICATION_ERROR();
  }

  const tokens = await tokenService.getTokens(userEntity._id);

  return { ...tokens, userId: userEntity._id, name: userEntity.name };
};

export const get = (id: string) => usersRepo.get(id);

export const save = (user: Record<string, unknown>) => usersRepo.save(user);

export const update = (id: string, user: Record<string, unknown>) =>
  usersRepo.update(id, user);

export const remove = async (id: string) => {
  await statisticService.remove(id);
  await settingsService.remove(id);
  await usersRepo.remove(id);
};
