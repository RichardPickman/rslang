import { OK } from 'http-status-codes';
import { Router } from 'express';
import validatorSchema from '../../utils/validation/schemas';
import { validator } from '../../utils/validation/validator';
import * as aggregatedWordsService from '../../Services/AggregatedWords';
import errors from '../../Errors/appErrors';
import { extractQueryParam } from '../../utils/getQueryNumberParameter';
import { TypedRequest, TypedResponse } from '../../Types';

const router = Router();

router.get('/', async (req: TypedRequest, res: TypedResponse) => {
  const perPage = extractQueryParam(req.query.wordsPerPage as string, 10);
  const page = extractQueryParam(req.query.page as string, 0);
  const group = extractQueryParam(req.query.group as string);

  if ((req.query.group && isNaN(group)) || isNaN(page) || isNaN(perPage)) {
    throw new errors.BAD_REQUEST_ERROR(
      'Wrong query parameters: the group, page and words-per-page numbers should be valid integers'
    );
  }

  const filter = req.query.filter
    ? JSON.parse(req.query?.filter as string)
    : null;

  const words = await aggregatedWordsService.getAll(
    req.userId as string,
    group,
    page,
    perPage,
    filter
  );
  res.status(OK).send(words);
});

router.get(
  '/:wordId',
  validator(validatorSchema.wordId, 'params'),
  async (req: TypedRequest, res: TypedResponse) => {
    const word = await aggregatedWordsService.get(
      req.params?.wordId,
      req.userId as string
    );

    res.status(OK).send(word);
  }
);

export default router;
