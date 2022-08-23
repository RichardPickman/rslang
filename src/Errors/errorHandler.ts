import { NextFunction } from 'express';
import { TypedError, TypedRequest, TypedResponse } from '../Types';

import { INTERNAL_SERVER_ERROR, getStatusText } from 'http-status-codes';
import logger from '../common/logging';

function handle(
  err: TypedError | unknown,
  res: TypedResponse,
  next: NextFunction
) {
  if (err instanceof Error) {
    if ((err as TypedError).status) {
      res.status((err as TypedError).status as number).send(err.message);
    } else {
      res.status((err as TypedError).status as number).send('Unhandled error');
      logger.error(err.stack as string);
      res
        .status(INTERNAL_SERVER_ERROR)
        .send(getStatusText(INTERNAL_SERVER_ERROR));
    }
    next();
  }
}

export default handle;
