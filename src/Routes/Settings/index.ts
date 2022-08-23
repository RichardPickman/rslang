import { OK } from 'http-status-codes';
import { upsert, get } from '../../Controller/Settings';
import { TypedRequest, TypedResponse } from '../../Types';
import schema from '../../utils/validation/schemas';
import { validator } from '../../utils/validation/validator';
import express from 'express';

const router = express.Router({ mergeParams: true });

router.get('/', async (req: TypedRequest, res: TypedResponse) => {
  const setting = await get(req.userId as string);
  res.status(OK).send(setting.toResponse());
});

router.put(
  '/',
  validator(schema.settings, 'body'),
  async (req: TypedRequest, res: TypedResponse) => {
    const setting = await upsert(req.userId as string, req.body);
    res.status(OK).send(setting.toResponse());
  }
);

export default router;
