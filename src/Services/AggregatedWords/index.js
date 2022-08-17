const wordRepo = require('../../Controller/AggregatedWords');

const getAll = async (userId, group, page, perPage, filter) =>
  wordRepo.getAll(userId, group, page, perPage, filter);

const get = async (wordId, userId) => wordRepo.get(wordId, userId);

module.exports = { getAll, get };
