import { TypedRequest, TypedResponse } from './../../Types/index';
import { OK } from 'http-status-codes';
import * as statisticService from '../../Controller/Statistics';
import schema from '../../utils/validation/schemas';
import { validator } from '../../utils/validation/validator';
import { NextFunction, Router } from 'express';

import ApiError from '../../Errors/appErrors';

const router = Router({ mergeParams: true });

router.get(
  '/',
  async (req: TypedRequest, res: TypedResponse, next: NextFunction) => {
    const statistic = await statisticService.get(req.userId as string);

    if (!statistic) {
      return next(ApiError.NotFoundError('statistic', `userId: ${req.userId}`));
    }

    return res.status(OK).send(statistic.toResponse());
  }
);

router.put(
  '/',
  validator(schema.statistics, 'body'),
  async (req: TypedRequest, res: TypedResponse) => {
    const statistic = await statisticService.upsert(
      req.userId as string,
      req.body
    );
    res.status(OK).send(statistic.toResponse());
  }
);

export default router;
