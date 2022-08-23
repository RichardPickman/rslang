import { NOT_FOUND, EXPECTATION_FAILED, UNAUTHORIZED, FORBIDDEN, BAD_REQUEST, getStatusText } from "http-status-codes";

export class AppError extends Error {
    constructor(message: string) {
        super(message);
    }
}

export class NotFoundError extends AppError {
    status;

    constructor(entity: string, params?: string | Record<string, unknown>, message?: string) {
        super(message || `Couldn't find a(an) ${entity} with: ${JSON.stringify(params)}`);
        this.status = NOT_FOUND;
    }
}

export class BadRequestError extends AppError {
    status;

    constructor(message: string) {
        super(message);
        this.status = BAD_REQUEST;
    }
}

export class EntityExistsError extends AppError {
    status;

    constructor(message: string) {
        super(message);
        this.status = EXPECTATION_FAILED;
    }
}

export class AuthorizationError extends AppError {
    status;

    constructor(message?: string) {
        super(message || getStatusText(UNAUTHORIZED));
        this.status = UNAUTHORIZED;
    }
}

export class AuthenticationError extends AppError {
    status;

    constructor(message?: string) {
        super(message || getStatusText(FORBIDDEN));
        this.status = FORBIDDEN;
    }
}

const errors = {
    NOT_FOUND_ERROR: NotFoundError,
    BAD_REQUEST_ERROR: BadRequestError,
    AUTHORIZATION_ERROR: AuthorizationError,
    AUTHENTICATION_ERROR: AuthenticationError,
    ENTITY_EXISTS: EntityExistsError,
};

export default errors;
