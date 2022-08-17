const bcrypt = require('bcrypt');

const usersRepo = require('../../Controller/Users');
const tokenService = require('../../Services/Token');
const settingsService = require('../../Services/Settings');
const statisticService = require('../../Services/Statistics');
const { AUTHENTICATION_ERROR } = require('../../Errors/appErrors');

const authenticate = async user => {
  const userEntity = await usersRepo.getUserByEmail(user.email);

  const isValidated = await bcrypt.compare(user.password, userEntity.password);
  if (!isValidated) {
    throw new AUTHENTICATION_ERROR();
  }

  const tokens = await tokenService.getTokens(userEntity._id);

  return { ...tokens, userId: userEntity._id, name: userEntity.name };
};

const get = id => usersRepo.get(id);

const save = user => usersRepo.save(user);

const update = (id, user) => usersRepo.update(id, user);

const remove = async id => {
  await statisticService.remove(id);
  await settingsService.remove(id);
  await usersRepo.remove(id);
};

module.exports = { authenticate, get, save, update, remove };
