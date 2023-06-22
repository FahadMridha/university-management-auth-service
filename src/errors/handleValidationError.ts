import mongoose from 'mongoose';
import { IGenericErrorMasage } from '../interfaces/error';
import { IGenericErrorResponce } from '../interfaces/common';

const handlerValidationError = (
  err: mongoose.Error.ValidationError
): IGenericErrorResponce => {
  const errors: IGenericErrorMasage[] = Object.values(err.errors).map(
    (el: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: el?.path,
        message: el?.message,
      };
    }
  );
  const statusCode = 400;
  return {
    statusCode,
    message: 'Validation error',
    errorMessages: errors,
  };
};

export default handlerValidationError;
