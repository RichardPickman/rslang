import { OK } from 'http-status-codes';
import { Router } from 'express';
import * as tokenService from '../../Services/Token';
import { TypedRequest, TypedResponse } from '../../Types';

const router = Router();

router.get('/', async (req: TypedRequest, res: TypedResponse) => {
  const tokens = await tokenService.refresh(
    req.userId as string,
    req.tokenId as string
  );
  res.status(OK).send(tokens);
});

export default router;
