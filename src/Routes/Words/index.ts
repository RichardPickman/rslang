import * as wordService from '../../Controller/Words';

import { OK } from 'http-status-codes';
import { Router } from 'express';
import { extractQueryParam } from '../../utils/getQueryNumberParameter';
import ApiError from '../../Errors/appErrors';
import { TypedRequest, TypedResponse } from '../../Types';

const ENTITY_NAME = 'word';

const router = Router();

router.get('/', async (req, res, next) => {
  const page = extractQueryParam(req.query.page as string, 0);
  const group = extractQueryParam(req.query.group as string, 0);

  if (isNaN(page) || isNaN(group)) {
    return next(
      ApiError.badRequest(
        'Wrong query parameters: the group, page numbers should be valid integers'
      )
    );
  }

  const words = await wordService.getAll({ page, group });
  return res.status(OK).send(words.map(word => word.toResponse()));
});

router.get('/:id', async (req: TypedRequest, res, next) => {
  const word = await wordService.get(req.params.id);

  if (!word) {
    return next(
      ApiError.NotFoundError(ENTITY_NAME, {
        wordId: req.params?.wordId,
        userId: req.userId
      })
    );
  }

  return res.status(OK).send(word.toResponse());
});

export default router;
