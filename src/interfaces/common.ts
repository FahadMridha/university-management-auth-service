import { IGenericErrorMasage } from './error';

export type IGenericErrorResponce = {
  statusCode: number;
  message: string;
  errorMessages: IGenericErrorMasage[];
};
