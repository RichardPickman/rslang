import {
  EXPECTATION_FAILED,
  FORBIDDEN,
  getStatusText,
  NOT_FOUND,
  UNAUTHORIZED
} from 'http-status-codes';
import { TypedError } from '../Types';

class ApiError extends Error {
  status;
  message;

  constructor(status: number, message: string) {
    super();

    this.status = status;
    this.message = message;
  }

  static badRequest(message: string) {
    return new ApiError(404, message);
  }

  static internal(message: string) {
    return new ApiError(500, message);
  }

  static forbidden(message: string) {
    return new ApiError(403, message);
  }

  static NotFoundError(
    entity: string,
    params?: string | Record<string, unknown>
  ) {
    return new ApiError(
      NOT_FOUND,
      `Couldn't find a(an) ${entity} with: ${JSON.stringify(params)}`
    );
  }

  static EntityExistsError(message: string) {
    return new ApiError(EXPECTATION_FAILED, message);
  }

  static AuthorizationError(message?: string) {
    return new ApiError(
      UNAUTHORIZED,
      message ? message : getStatusText(UNAUTHORIZED)
    );
  }

  static AuthenticationError(message?: string) {
    return new ApiError(
      FORBIDDEN,
      message ? message : getStatusText(FORBIDDEN)
    );
  }
}

export default ApiError;
