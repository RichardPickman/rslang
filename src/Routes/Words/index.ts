import * as wordService from '../../Controller/Words';
import errors from '../../Errors/appErrors';
import { OK } from 'http-status-codes';
import { Router } from 'express';
import { extractQueryParam } from '../../utils/getQueryNumberParameter';
import { TypedRequest, TypedResponse } from '../../Types';

const router = Router();

router.get('/', async (req, res) => {
  const page = extractQueryParam(req.query.page as string, 0);
  const group = extractQueryParam(req.query.group as string, 0);

  if (isNaN(page) || isNaN(group)) {
    throw new errors.BAD_REQUEST_ERROR(
      'Wrong query parameters: the group, page numbers should be valid integers'
    );
  }

  const words = await wordService.getAll({ page, group });
  return res.status(OK).send(words.map(word => word.toResponse()));
});

router.get('/:id', async (req, res) => {
  const word = await wordService.get(req.params.id);
  return res.status(OK).send(word.toResponse());
});

export default router;
