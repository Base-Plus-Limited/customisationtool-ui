import { Dispatch, SetStateAction } from 'react';
import IWordpressProduct from "./WordpressProduct";
import IErrorResponse from "./ErrorResponse";

export default interface ICustomiseContext {
  applicationError: IErrorResponse;
  setApplicationError: Dispatch<SetStateAction<IErrorResponse>>;
  ingredients: IWordpressProduct[];
  saveIngredients: Dispatch<SetStateAction<IWordpressProduct[]>>;
}
