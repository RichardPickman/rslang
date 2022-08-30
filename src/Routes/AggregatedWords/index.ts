import { OK } from 'http-status-codes';
import { NextFunction, Router } from 'express';
import validatorSchema from '../../utils/validation/schemas';
import { validator } from '../../utils/validation/validator';
import * as aggregatedWordsService from '../../Services/AggregatedWords';

import { extractQueryParam } from '../../utils/getQueryNumberParameter';
import { TypedRequest, TypedResponse } from '../../Types';
import ApiError from '../../Errors/appErrors';

const ENTITY_NAME = 'user word';

const router = Router();

router.get(
  '/',
  async (req: TypedRequest, res: TypedResponse, next: NextFunction) => {
    const perPage = extractQueryParam(req.query.wordsPerPage as string, 10);
    const page = extractQueryParam(req.query.page as string, 0);
    const group = extractQueryParam(req.query.group as string);

    if ((req.query.group && isNaN(group)) || isNaN(page) || isNaN(perPage)) {
      return next(
        ApiError.badRequest(
          'Wrong query parameters: the group, page and words-per-page numbers should be valid integers'
        )
      );
    }

    let filter;

    try {
      filter = req.query.filter ? JSON.parse(req.query.filter as string) : null;
    } catch (err) {
      if (err instanceof Error) {
        return next(ApiError.badRequest('Invalid filter query'));
      }
    }

    const words = await aggregatedWordsService.getAll(
      req.userId as string,
      group,
      page,
      perPage,
      filter
    );

    return res.status(OK).send(words);
  }
);

router.get(
  '/:wordId',
  validator(validatorSchema.wordId, 'params'),
  async (req: TypedRequest, res: TypedResponse, next: NextFunction) => {
    const word = await aggregatedWordsService.get(
      req.params?.wordId,
      req.userId as string
    );

    if (!word) {
      return next(
        ApiError.NotFoundError(ENTITY_NAME, {
          wordId: req.params?.wordId,
          userId: req.userId
        })
      );
    }

    return res.status(OK).send(word);
  }
);

export default router;
