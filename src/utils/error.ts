export class AppError extends Error {
  public readonly name: string;
  public readonly httpCode: number;
  public readonly isOperational: boolean;

  constructor(name: string, httpCode: number, description: string, isOperational: boolean) {
    super(description);

    Object.setPrototypeOf(this, new.target.prototype);

    this.name = name;
    this.httpCode = httpCode;
    this.isOperational = isOperational;

    Error.captureStackTrace(this);
  }
}

export class APIError extends AppError {
  constructor(name: string, httpCode = 500, description = 'Internal server error', isOperational = true) {
    super(name, httpCode, description, isOperational);
  }
}

export class HTTP400Error extends AppError {
  constructor(description = 'Bad request') {
    super('BAD_REQUEST', 400, description, true);
  }
}

export class HTTP401Error extends AppError {
  constructor(description = 'Unauthorized') {
    super('UNAUTHORIZED', 401, description, true);
  }
}

export class HTTP403Error extends AppError {
  constructor(description = 'Forbidden') {
    super('FORBIDDEN', 403, description, true);
  }
}

export class HTTP404Error extends AppError {
  constructor(description = 'Not found') {
    super('NOT_FOUND', 404, description, true);
  }
}

export class HTTP409Error extends AppError {
  constructor(description = 'Conflict') {
    super('CONFLICT', 409, description, true);
  }
}

export class HTTP422Error extends AppError {
  constructor(description = 'Unprocessable entity') {
    super('UNPROCESSABLE_ENTITY', 422, description, true);
  }
}

export class HTTP429Error extends AppError {
  constructor(description = 'Too many requests') {
    super('TOO_MANY_REQUESTS', 429, description, true);
  }
}

export class HTTP500Error extends AppError {
  constructor(description = 'Internal server error') {
    super('INTERNAL_SERVER_ERROR', 500, description, true);
  }
}

export class HTTP503Error extends AppError {
  constructor(description = 'Service unavailable') {
    super('SERVICE_UNAVAILABLE', 503, description, true);
  }
}

export function isAppError(error: any): error is AppError {
  return error instanceof AppError;
}

export function isOperationalError(error: Error): boolean {
  if (isAppError(error)) {
    return error.isOperational;
  }
  return false;
}

export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  return String(error);
}

export function getErrorStack(error: unknown): string | undefined {
  if (error instanceof Error) {
    return error.stack;
  }
  return undefined;
}

export function getErrorName(error: unknown): string {
  if (error instanceof Error) {
    return error.name;
  }
  return 'Unknown Error';
}

export function getErrorHttpCode(error: unknown): number {
  if (isAppError(error)) {
    return error.httpCode;
  }
  return 500;
}

export function formatError(error: unknown): {
  name: string;
  message: string;
  stack?: string;
  httpCode?: number;
  isOperational?: boolean;
} {
  if (isAppError(error)) {
    return {
      name: error.name,
      message: error.message,
      stack: error.stack,
      httpCode: error.httpCode,
      isOperational: error.isOperational
    };
  }

  if (error instanceof Error) {
    return {
      name: error.name,
      message: error.message,
      stack: error.stack
    };
  }

  return {
    name: 'Unknown Error',
    message: String(error)
  };
}

export function handleError(error: unknown): void {
  if (!isOperationalError(error as Error)) {
    process.exit(1);
  }
}

export function throwError(message: string): never {
  throw new Error(message);
}

export function throwIf(condition: boolean, message: string): void {
  if (condition) {
    throwError(message);
  }
}

export function throwUnless(condition: boolean, message: string): void {
  if (!condition) {
    throwError(message);
  }
}

export function assertError(error: unknown): asserts error is Error {
  if (!(error instanceof Error)) {
    throw new Error(`Expected error to be instance of Error but got ${typeof error}`);
  }
}

export function tryOrThrow<T>(fn: () => T, errorMessage: string): T {
  try {
    return fn();
  } catch (error) {
    throw new Error(errorMessage);
  }
}

export async function tryOrThrowAsync<T>(fn: () => Promise<T>, errorMessage: string): Promise<T> {
  try {
    return await fn();
  } catch (error) {
    throw new Error(errorMessage);
  }
}

export function createErrorFromUnknown(error: unknown, defaultMessage = 'An unknown error occurred'): Error {
  if (error instanceof Error) {
    return error;
  }
  return new Error(typeof error === 'string' ? error : defaultMessage);
}

export function isError(error: unknown): error is Error {
  return error instanceof Error;
}

export function isErrorWithCode(error: unknown): error is Error & { code: string } {
  return isError(error) && 'code' in error;
}

export function isErrorWithStatus(error: unknown): error is Error & { status: number } {
  return isError(error) && 'status' in error;
}

export function isErrorWithResponse(error: unknown): error is Error & { response: unknown } {
  return isError(error) && 'response' in error;
}

export function getErrorCode(error: unknown): string | undefined {
  if (isErrorWithCode(error)) {
    return error.code;
  }
  return undefined;
}

export function getErrorStatus(error: unknown): number | undefined {
  if (isErrorWithStatus(error)) {
    return error.status;
  }
  return undefined;
}

export function getErrorResponse(error: unknown): unknown | undefined {
  if (isErrorWithResponse(error)) {
    return error.response;
  }
  return undefined;
} 