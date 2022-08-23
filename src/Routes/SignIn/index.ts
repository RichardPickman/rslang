import { Router } from 'express';
import { OK } from 'http-status-codes';
import * as userService from '../../Services/Users';
import { TypedRequest, TypedResponse } from '../../Types';

const router = Router();

router.route('/').post(async (req: TypedRequest, res: TypedResponse) => {
  const auth = await userService.authenticate(req.body);

  res.status(OK).json({
    message: 'Authenticated',
    ...auth
  });
});

export default router;
