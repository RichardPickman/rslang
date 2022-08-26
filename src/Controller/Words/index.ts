import Word from '../../Models/Words';

export const getAll = async (conditions: Record<string, unknown>) => {
  const { group, page } = conditions;

  return Word.find({ group, page });
};

export const get = async (id: string) => {
  const word = await Word.findOne({ _id: id });

  if (!word) {
    return null;
  }
  return word;
};
