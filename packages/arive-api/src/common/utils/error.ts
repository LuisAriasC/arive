export interface ErrorInfo {
  code: string;
  message: string;
  details?: any;
}

export class AuthError extends Error {
  constructor(private errorInfo: ErrorInfo) {
    super(errorInfo.message);

    (this as any).__proto__ = AuthError.prototype;
  }

  /** @return {string} The error code. */
  public get code(): string {
    return this.errorInfo.code;
  }

  /** @return {string} The error message. */
  public get message(): string {
    return this.errorInfo.message;
  }

  /** @return {object} The object representation of the error. */
  public toJSON(): object {
    return {
      code: this.code,
      message: this.message,
    };
  }
}

export class AuthErrorCode {
  public static TOKEN_INVALID = {
    code: 'token-invalid',
    message:
      'The token is invalid or malformed. Make sure you passed the JWT token.',
  };

  public static TOKEN_EXPIRED = {
    code: 'token-expired',
    message: 'The token is is expired.',
  };

  public static INVALID_CREDENTIALS = {
    code: 'invalid-credentials',
    message: 'Your email or password are invalid.',
  };

  public static SERVER_ERROR = {
    code: 'server-error',
    message: 'The server has an error.',
  };

  public static TOO_MANY_ATTEMPS = {
    code: 'too-many-attemps',
    message:
      'Your account was blocked due to many failed login attemps. Please change your password or try again later.',
  };

  public static INVALID_TENANT = {
    code: 'invalid-tenant',
    message: 'This tenant does not exists',
  };

  public static INVALID_CODE = {
    code: 'invalid-code',
    message: 'Invalid authorization code',
  };

  public static INEXISTENT_ENTITY = {
    code: 'inexistent-entity',
    message: 'Inexistent entity in db',
  };

  public static INTERNAL_SERVER_ERROR = {
    code: 'innternal-server-error',
    message: '',
  };
}
