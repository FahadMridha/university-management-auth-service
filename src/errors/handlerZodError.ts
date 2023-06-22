import { ZodError, ZodIssue } from 'zod';
import { IGenericErrorResponce } from '../interfaces/common';
import { IGenericErrorMasage } from '../interfaces/error';

const handlerZodError = (error: ZodError): IGenericErrorResponce => {
  const errors: IGenericErrorMasage[] = error.issues.map((issues: ZodIssue) => {
    return {
      path: issues?.path[issues.path.length - 1],
      message: issues?.message,
    };
  });

  const statusCode = 400;
  return {
    statusCode,
    message: 'Validation error',
    errorMessages: errors,
  };
};

export default handlerZodError;
