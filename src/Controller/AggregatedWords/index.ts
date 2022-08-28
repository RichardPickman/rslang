import mongoose from 'mongoose';
import Word from '../../Models/Words';

const lookup = {
  $lookup: {
    from: 'userWords',
    let: { word_id: '$_id', user_id: '$_id' },
    pipeline: [
      {
        $match: {
          $expr: {
            $and: [{ $eq: ['$wordId', '$$word_id'] as unknown[] }]
          }
        }
      }
    ],
    as: 'userWord'
  }
};

const pipeline = [
  {
    $unwind: {
      path: '$userWord',
      preserveNullAndEmptyArrays: true
    }
  },
  {
    $unset: [
      '__v',
      'userWord._id',
      'userWord.wordId',
      'userWord.userId',
      'userWord.__v'
    ]
  }
];

export const getAll = async (
  userId: string,
  group: number,
  page: number,
  perPage: number,
  filter: Record<string, unknown> | null
) => {
  lookup.$lookup.pipeline[0].$match.$expr.$and.push({
    $eq: ['$userId', new mongoose.Types.ObjectId(userId)] as unknown[]
  });

  const matches = [];

  if (group || group === 0) {
    matches.push({
      $match: {
        group
      }
    });
  }

  if (filter) {
    matches.push({
      $match: {
        ...filter
      }
    });
  }

  const facet = {
    $facet: {
      paginatedResults: [{ $skip: page * perPage }, { $limit: perPage }],
      totalCount: [
        {
          $count: 'count'
        }
      ]
    }
  };

  return await Word.aggregate([lookup, ...pipeline, ...matches, facet]);
};

export const get = async (wordId: string, userId: string) => {
  lookup.$lookup.pipeline[0].$match.$expr.$and[0].$eq[1] = String(
    new mongoose.Types.ObjectId(userId)
  );

  const match = {
    $match: {
      _id: new mongoose.Types.ObjectId(wordId)
    }
  };

  const userWord = await Word.aggregate([match, lookup, ...pipeline]);

  return userWord;
};
