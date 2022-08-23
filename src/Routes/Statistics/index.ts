import { TypedRequest, TypedResponse } from './../../Types/index';
import { OK } from 'http-status-codes';
import * as statisticService from '../../Controller/Statistics';
import schema from '../../utils/validation/schemas';
import { validator } from '../../utils/validation/validator';
import { Router } from 'express';

const router = Router({ mergeParams: true });

router.get('/', async (req: TypedRequest, res: TypedResponse) => {
  const statistic = await statisticService.get(req.userId as string);
  res.status(OK).send(statistic.toResponse());
});

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
