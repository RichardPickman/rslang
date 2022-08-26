import { NextFunction } from 'express';
import { TypedRequest, TypedResponse } from '../Types';
import ApiError from './appErrors';

export default function errorHandler(
  err: ApiError,
  req: TypedRequest,
  res: TypedResponse,
  next: NextFunction
) {
  return res.status(err.status).json({ message: err.message });
}
