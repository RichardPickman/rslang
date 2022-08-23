import {
  BAD_REQUEST,
  UNPROCESSABLE_ENTITY,
  FORBIDDEN
} from 'http-status-codes';
import { TypedRequest, TypedResponse } from '../../Types';
import { NextFunction } from 'express';
import Joi, { ValidationErrorItem } from 'joi';

const errorResponse = (errors: ValidationErrorItem[]) => {
  return {
    status: 'failed',
    errors: errors.map(err => {
      const { path, message } = err;
      return { path, message };
    })
  };
};

export const validator = (
  schema: Joi.ObjectSchema,
  property: 'body' | 'params'
) => {
  return (req: TypedRequest, res: TypedResponse, next: NextFunction) => {
    const { error } = schema.validate(req[property]);
    if (error) {
      res
        .status(property === 'body' ? UNPROCESSABLE_ENTITY : BAD_REQUEST)
        .json({
          error: errorResponse(error.details)
        });

      return;
    } else {
      return next();
    }
  };
};

export function userIdValidator(
  req: TypedRequest,
  res: TypedResponse,
  next: NextFunction
) {
  if (req.userId !== req.params?.id) {
    res.sendStatus(FORBIDDEN);
  } else {
    next();
  }
}
