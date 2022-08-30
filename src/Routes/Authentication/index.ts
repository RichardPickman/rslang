import { NextFunction, Router } from 'express';
import { OK } from 'http-status-codes';
import { TypedRequest, TypedResponse } from '../../Types';
import * as userService from '../../Services/Users';

import ApiError from '../../Errors/appErrors';

const router = Router();

router
  .route('/')
  .post(async (req: TypedRequest, res: TypedResponse, next: NextFunction) => {
    const auth = await userService.authenticate(req.body);

    if (!auth) {
      return next(ApiError.AuthenticationError());
    }

    return res.status(OK).json({
      message: 'Authenticated',
      ...auth
    });
  });

export default router;
