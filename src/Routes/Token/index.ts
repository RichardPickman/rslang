import { OK } from 'http-status-codes';
import { NextFunction, Router } from 'express';
import * as tokenService from '../../Services/Token';
import { TypedRequest, TypedResponse } from '../../Types';
import ApiError from '../../Errors/appErrors';

const router = Router();

router.get(
  '/',
  async (req: TypedRequest, res: TypedResponse, next: NextFunction) => {
    const tokens = await tokenService.refresh(
      req.userId as string,
      req.tokenId as string
    );

    if (!tokens) {
      return next(ApiError.AuthenticationError('Token is expired'));
    }

    return res.status(OK).send(tokens);
  }
);

export default router;
