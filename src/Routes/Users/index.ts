import { OK, NO_CONTENT } from 'http-status-codes';
import { Router } from 'express';

import * as userService from '../../Controller/Users';
import schema from '../../utils/validation/schemas';
import { validator, userIdValidator } from '../../utils/validation/validator';
import { TypedRequest, TypedResponse } from '../../Types';

const router = Router();

router.post(
  '/',
  validator(schema.user, 'body'),
  async (req: TypedRequest, res: TypedResponse) => {
    const userEntity = await userService.save(req.body);
    res.status(OK).send(userEntity?.toResponse());
  }
);

router.get(
  '/:id',
  userIdValidator,
  validator(schema.id, 'params'),
  async (req: TypedRequest, res: TypedResponse) => {
    const userEntity = await userService.get(req.params?.id as string);
    res.status(OK).send(userEntity.toResponse());
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
