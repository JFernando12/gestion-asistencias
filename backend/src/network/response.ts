import { Request, Response } from 'express';

const success = (
  req: Request,
  res: Response,
  status: number,
  data: any,
  message?: string,
  options?: { offset?: number; limit?: number, count?: number }
) => {
  let statusCode = status || 200;
  let statusMessage = message || '';

  res.status(statusCode).json({
    status: status,
    message: statusMessage,
    ...options,
    data,
  });
};

const error = (
  req: Request,
  res: Response,
  status: number,
  message?: string,
  data?: any
) => {
  let statusCode = status || 500;
  let statusMessage = message || 'Internal server error';

  res.status(statusCode).json({
    status: status,
    message: statusMessage,
    data,
  });
};

export default { success, error };
