export type BackendErrorCode =
  | 'validation'
  | 'authentication'
  | 'authorization'
  | 'provider'
  | 'connectivity'
  | 'unknown';

export type BackendError = {
  code: BackendErrorCode;
  message: string;
  retryable: boolean;
};
