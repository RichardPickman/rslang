import { NextFunction, Router } from 'express';
import { OK } from 'http-status-codes';
import ApiError from '../../Errors/appErrors';

import * as userService from '../../Services/Users';
import { TypedRequest, TypedResponse } from '../../Types';

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
