import { TypedRequest, TypedResponse } from './../Types/index';
import { NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import settings from '../common/config';
import errors from '../Errors/appErrors';

const ALLOWED_PATHS = ['/signin', '/signup'];
const DOC_PATH_REGEX = /^\/doc\/?$/;
const DOC_PATH_RESOURCES_REGEX = /^\/doc\/.+$/;
const WORDS_PATH_REGEX = /^\/words.*$/;
const USERS_PATH = '/users';

function isOpenPath(path: string) {
  return (
    ALLOWED_PATHS.includes(path) ||
    DOC_PATH_REGEX.test(path) ||
    DOC_PATH_RESOURCES_REGEX.test(path) ||
    WORDS_PATH_REGEX.test(path)
  );
}

const checkAuthentication = (
  req: TypedRequest,
  res: TypedResponse,
  next: NextFunction
) => {
  if (isOpenPath(req.path)) {
    return next();
  }

  if (req.path === USERS_PATH && req.method === 'POST') {
    return next();
  }

  const rawToken = req.headers.authorization;
  if (!rawToken) {
    throw new errors.AUTHORIZATION_ERROR();
  }

  try {
    const token = rawToken.slice(7, rawToken.length);
    const secret = req.path.includes('tokens')
      ? (settings.JWT_REFRESH_SECRET_KEY as string)
      : (settings.JWT_SECRET_KEY as string);
    const { id, tokenId } = jwt.verify(token, secret) as JwtPayload;
    req.userId = id;
    req.tokenId = tokenId;
  } catch (error) {
    throw new errors.AUTHORIZATION_ERROR();
  }

  next();
};

export default checkAuthentication;
