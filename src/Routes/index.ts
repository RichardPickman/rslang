import path from 'path';
import userRouter from './Users';
import wordRouter from './Words';
import swaggerUI from 'swagger-ui-express';
import userTokenRouter from './Token';
import errorHandler from '../Errors/errorHandler';
import settingRouter from './Settings';
import signinRouter from './SignIn';
import userWordsRouter from './UserWord';
import statisticRouter from './Statistics';
import aggregatedWordsRouter from './AggregatedWords';
import express from 'express';
import YAML from 'yamljs';
import Router, { NextFunction } from 'express';

import { userIdValidator } from '../utils/validation/validator';
import checkAuthentication from '../utils/checkAuthentication';
import morgan from 'morgan';
import { stream } from '../common/logging';
import ApiError from '../Errors/appErrors';

const swaggerDocument = YAML.load(path.join(__dirname, '../../doc/api.yaml'));

const router = Router();

router.use('/files', express.static(path.join(__dirname, '../../files')));

router.use(checkAuthentication);

router.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
router.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }

  return next();
});

router.use(
  morgan(
    ':method :status :url :userId size req :req[content-length] res :res[content-length] - :response-time ms',
    { stream }
  )
);

router.use('/words', wordRouter);
router.use('/signin', signinRouter);
router.use('/users', userRouter);

userRouter.use('/:id/words', userIdValidator, userWordsRouter);
userRouter.use('/:id/tokens', userIdValidator, userTokenRouter);
userRouter.use('/:id/aggregatedWords', userIdValidator, aggregatedWordsRouter);
userRouter.use('/:id/statistics', userIdValidator, statisticRouter);
userRouter.use('/:id/settings', userIdValidator, settingRouter);

function unknownRouteHandler(
  err: ApiError,
  req: express.Request,
  res: express.Response,
  next: NextFunction
) {
  if (!err) {
    return next(ApiError.NotFoundError('path'));
  }

  next(err);
}

router.use(unknownRouteHandler);

router.use(errorHandler);

export default router;
