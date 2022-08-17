const wordRepo = require('../../Controller/words');

const getAll = async conditions => wordRepo.getAll(conditions);

const get = async wordId => {
  const word = await wordRepo.get(wordId);

  return word;
};

module.exports = { getAll, get };
