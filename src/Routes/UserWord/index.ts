import * as userWordService from '../../Controller/UserWords';
import user from '../../utils/validation/schemas';
import { OK, NO_CONTENT } from 'http-status-codes';
import { NextFunction, Router } from 'express';
import { userIdValidator, validator } from '../../utils/validation/validator';
import { TypedRequest, TypedResponse, TypedError } from '../../Types';
import ApiError from '../../Errors/appErrors';

const ENTITY_NAME = 'user word';

const router = Router();

router.get('/', async (req: TypedRequest, res: TypedResponse) => {
  const userWords = await userWordService.getAll(req.userId as string);
  res.status(OK).send(userWords.map((w: any) => w.toResponse()));
});

router.get(
  '/:wordId',
  validator(user.wordId, 'params'),
  async (req: TypedRequest, res: TypedResponse, next: NextFunction) => {
    const word = await userWordService.get(
      req.params?.wordId as string,
      req.userId as string
    );

    if (!word) {
      return next(
        ApiError.NotFoundError(ENTITY_NAME, {
          userId: req.userId,
          wordId: req.params?.wordId
        })
      );
    }

    return res.status(OK).send(word?.toResponse());
  }
);

router.post(
  '/:wordId',
  validator(user.wordId, 'params'),
  validator(user.userWord, 'body'),
  async (req: TypedRequest, res: TypedResponse, next: NextFunction) => {
    const word = await userWordService.save(
      req.params?.wordId as string,
      req.userId as string,
      req.body
    );

    if (!word) {
      return next(ApiError.EntityExistsError(`such user word already exists`));
    }

    return res.status(OK).send(word?.toResponse());
  }
);

router.put(
  '/:wordId',
  validator(user.wordId, 'params'),
  validator(user.userWord, 'body'),
  async (req: TypedRequest, res: TypedResponse, next: NextFunction) => {
    const word = await userWordService.update(
      req.params?.wordId as string,
      req.userId as string,
      req.body
    );

    if (!word) {
      return next(
        ApiError.NotFoundError(ENTITY_NAME, {
          wordId: req.params?.wordId,
          userId: req.userId
        })
      );
    }

    return res.status(OK).send(word.toResponse());
  }
);

router.delete(
  '/:wordId',
  validator(user.wordId, 'params'),
  async (req: TypedRequest, res: TypedResponse) => {
    await userWordService.remove(
      req.params?.wordId as string,
      req.userId as string
    );
    res.sendStatus(NO_CONTENT);
  }
);

export default router;
