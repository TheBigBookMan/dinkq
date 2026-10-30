export type ErrorCode = 'VALIDATION' | 'UNAUTHORIZED' | 'FORBIDDEN' | 'NOT_FOUND' | 'CONFLICT'

export class AppError extends Error {
  constructor(
    public code: ErrorCode,
    message: string,
    public details?: unknown,
  ) {
    super(message)
    this.name = 'AppError'
  }
}

export const notFound = (what = 'Resource') => new AppError('NOT_FOUND', `${what} not found`)
export const unauthorized = () => new AppError('UNAUTHORIZED', 'Sign in required')
export const forbidden = () => new AppError('FORBIDDEN', 'You do not have access to this')