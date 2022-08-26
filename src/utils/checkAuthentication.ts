import { TypedRequest, TypedResponse } from './../Types/index';
import { NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import settings from '../common/config';

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
    return res.sendStatus(401);
  }

  try {
    const token = rawToken.slice(7, rawToken.length);
    const secret = req.path.includes('tokens')
      ? (settings.JWT_REFRESH_SECRET_KEY as jwt.Secret)
      : (settings.JWT_SECRET_KEY as jwt.Secret);

    const { id, tokenId } = jwt.verify(token, secret) as jwt.JwtPayload;

    req.userId = id;
    req.tokenId = tokenId;

    next();
  } catch (err) {
    if (err instanceof Error) {
      return res.status(401).send('Incorrect refresh token');
    }
  }
};

export default checkAuthentication;
