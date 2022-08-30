import { OK } from 'http-status-codes';
import { upsert, get } from '../../Controller/Settings';
import { TypedRequest, TypedResponse } from '../../Types';
import schema from '../../utils/validation/schemas';
import { validator } from '../../utils/validation/validator';
import express, { NextFunction } from 'express';

import ApiError from '../../Errors/appErrors';

const router = express.Router({ mergeParams: true });

router.get(
  '/',
  async (req: TypedRequest, res: TypedResponse, next: NextFunction) => {
    const setting = await get(req.userId as string);

    if (!setting) {
      return next(ApiError.NotFoundError('Cannot find setting'));
    }

    return res.status(OK).send(setting.toResponse());
  }
);

router.put(
  '/',
  validator(schema.settings, 'body'),
  async (req: TypedRequest, res: TypedResponse) => {
    const setting = await upsert(req.userId as string, req.body);
    res.status(OK).send(setting.toResponse());
  }
);

export default router;
