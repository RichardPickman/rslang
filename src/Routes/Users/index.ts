import schema from '../../utils/validation/schemas';
import userTokenRouter from '../Token';
import settingRouter from '../Settings';
import userWordsRouter from '../UserWord';
import statisticRouter from '../Statistics';
import aggregatedWordsRouter from '../AggregatedWords';
import { OK, NO_CONTENT } from 'http-status-codes';
import { NextFunction, Router } from 'express';

import * as userService from '../../Controller/Users';
import { validator, userIdValidator } from '../../utils/validation/validator';
import { TypedRequest, TypedResponse } from '../../Types';
import ApiError from '../../Errors/appErrors';

const ENTITY_NAME = 'user';

const router = Router();

router.post(
  '/',
  validator(schema.user, 'body'),
  async (req: TypedRequest, res: TypedResponse, next: NextFunction) => {
    const userEntity = await userService.save(req.body);
    if (!userEntity) {
      return next(
        ApiError.EntityExistsError(`${ENTITY_NAME} with this e-mail exists`)
      );
    }

    return res.status(OK).send(userEntity?.toResponse());
  }
);

router.get(
  '/:id',
  userIdValidator,
  validator(schema.id, 'params'),
  async (req: TypedRequest, res: TypedResponse, next: NextFunction) => {
    const userEntity = await userService.get(req.params?.id as string);

    if (!userEntity) {
      return next(ApiError.NotFoundError(ENTITY_NAME, { id: req.params?.id }));
    }

    return res.status(OK).send(userEntity.toResponse());
  }
);

router.put(
  '/:id',
  userIdValidator,
  validator(schema.id, 'params'),
  validator(schema.user, 'body'),
  async (req: TypedRequest, res: TypedResponse) => {
    const userEntity = await userService.update(req.userId as string, req.body);
    res.status(OK).send(userEntity?.toResponse());
  }
);

router.delete(
  '/:id',
  userIdValidator,
  validator(schema.id, 'params'),
  async (req: TypedRequest, res: TypedResponse) => {
    await userService.remove(req.params?.id as string);
    res.sendStatus(NO_CONTENT);
  }
);

export default router;
