import { Router } from 'express';
import { OK } from 'http-status-codes';
import { TypedRequest, TypedResponse } from '../../Types';
import * as userService from '../../Services/Users';

const router = Router();

router.route('/').post(async (req: TypedRequest, res: TypedResponse) => {
  const auth = await userService.authenticate(req.body);

  res.status(OK).json({
    message: 'Authenticated',
    ...auth
  });
});

export default router;
