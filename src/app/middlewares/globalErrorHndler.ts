import { ErrorRequestHandler } from 'express';
import config from '../../config';
import { IGenericErrorMasage } from '../../interfaces/error';
import handlerValidationError from '../../errors/handleValidationError';
import ApiErrors from '../../errors/ApiErrors';
import { ZodError } from 'zod';
import handlerZodError from '../../errors/handlerZodError';

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  // config.env === 'development';

  // ? console.log(`globalErrorHandler~~`, error)
  // : errorlogger.error(`globalErrorHandler~~~~`, error);

  let statusCode = 500;
  let message = 'something went wrong !';
  let errorMassages: IGenericErrorMasage[] = [];
  if (error?.name === 'validationError') {
    const simplefiedError = handlerValidationError(error);
    statusCode = simplefiedError.statusCode;
    message = simplefiedError.message;
    errorMassages = simplefiedError.errorMessages;
  } else if (error instanceof ZodError) {
    const simplefiedError = handlerZodError(error);
    statusCode = simplefiedError.statusCode;
    message = simplefiedError.message;
    errorMassages = simplefiedError.errorMessages;
  } else if (error instanceof ApiErrors) {
    statusCode = error?.statusCode;
    message = error?.message;
    errorMassages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : [];
  } else if (error instanceof Error) {
    message = error?.message;
    errorMassages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : [];
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMassages,
    stack: config.env !== 'production' ? error?.stack : undefined,
  });
  next();
};

export default globalErrorHandler;
