import path from 'path';
import userRouter from './Users';
import wordRouter from './Words';
import swaggerUI from 'swagger-ui-express';
import userTokenRouter from './Token';
import errorHandler from '../Errors/errorHandler';
import createError from 'http-errors';
import settingRouter from './Settings';
import signinRouter from './SignIn';
import userWordsRouter from './UserWord';
import statisticRouter from './Statistics';
import aggregatedWordsRouter from './AggregatedWords';
import express from 'express';
import YAML from 'yamljs';
import Router, { NextFunction } from 'express';

import { userIdValidator } from '../utils/validation/validator';
import { NOT_FOUND } from 'http-status-codes';
import { TypedRequest, TypedResponse } from '../Types';

const swaggerDocument = YAML.load(path.join(__dirname, '../../doc/api.yaml'));

const router = Router();

router.use('/files', express.static(path.join(__dirname, '../../files')));

router.use('/words', wordRouter);
router.use('/signin', signinRouter);
router.use('/users', userRouter);

router.use('/:id/words', userIdValidator, userWordsRouter);
router.use('/:id/tokens', userIdValidator, userTokenRouter);
router.use('/:id/aggregatedWords', userIdValidator, aggregatedWordsRouter);
router.use('/:id/statistics', userIdValidator, statisticRouter);
router.use('/:id/settings', userIdValidator, settingRouter);

router.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
router.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }

  return next();
});
router.use(errorHandler);
router.use(unknownRouteHandler);

function unknownRouteHandler(next: NextFunction) {
  next(createError(NOT_FOUND));
}

export default router;
