import { Dispatch, SetStateAction } from 'react';
import IErrorResponse from "./ErrorResponse";
import ICategorisedIngredient from './CategorisedIngredient';
import { ISelectableProduct } from './WordpressProduct';

export default interface ICustomiseContext {
  applicationError: IErrorResponse;
  setApplicationError: Dispatch<SetStateAction<IErrorResponse>>;
  categorisedIngredients: ICategorisedIngredient[];
  updateCategorisedIngredients: Dispatch<SetStateAction<ICategorisedIngredient[]>>;
  selectedIngredients: ISelectableProduct[];
  updateSelectedIngredients: Dispatch<SetStateAction<ISelectableProduct[]>>;
  isDescriptionVisible: boolean;
  toggleDescriptionVisibility: Dispatch<SetStateAction<boolean>>;
}
