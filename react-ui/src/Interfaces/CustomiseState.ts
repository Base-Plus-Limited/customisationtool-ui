import { Dispatch, SetStateAction } from 'react';
import IErrorResponse from "./ErrorResponse";
import ICategorisedIngredient from './CategorisedIngredient';

export default interface ICustomiseContext {
  applicationError: IErrorResponse;
  setApplicationError: Dispatch<SetStateAction<IErrorResponse>>;
  categorisedIngredients: ICategorisedIngredient[];
  updateCategorisedIngredients: Dispatch<SetStateAction<ICategorisedIngredient[]>>;
  totalIngredientsSelected: number;
  updateTotalIngredientsSelected: Dispatch<SetStateAction<number>>;
}
