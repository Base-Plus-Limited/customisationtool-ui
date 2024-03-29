import { Dispatch, SetStateAction } from 'react';
import IErrorResponse from "./ErrorResponse";
import ICategorisedIngredient from './CategorisedIngredient';
import { ISelectableProduct } from './WordpressProduct';
import { IHeading } from './Heading';
import { MoisturiserSize } from './MoisturiserSize';

export default interface ICustomiseContext {
  moisturiserSize: MoisturiserSize;
  saveMoisturiserSize: Dispatch<SetStateAction<MoisturiserSize>>;
  hasApplicationErrored: IErrorResponse;
  setApplicationError: Dispatch<SetStateAction<IErrorResponse>>;
  categorisedIngredients: ICategorisedIngredient[];
  updateCategorisedIngredients: Dispatch<SetStateAction<ICategorisedIngredient[]>>;
  selectedIngredients: ISelectableProduct[];
  updateSelectedIngredients: Dispatch<SetStateAction<ISelectableProduct[]>>;
  isDescriptionVisible: boolean;
  toggleDescriptionVisibility: Dispatch<SetStateAction<boolean>>;
  currentMixture: ISelectableProduct[];
  addToMixture: Dispatch<SetStateAction<ISelectableProduct[]>>;
  headings: IHeading[];
  updateHeadings: Dispatch<SetStateAction<IHeading[]>>;
  baseProduct: ISelectableProduct;
  saveBaseProduct: Dispatch<SetStateAction<ISelectableProduct>>;
  userName: string;
  saveUserName: Dispatch<SetStateAction<string>>;
  isProductBeingAmended: boolean;
  updateIsProductBeingAmended: Dispatch<SetStateAction<boolean>>;
  isCheckoutButtonSelected: boolean;
  updateIsCheckoutButtonSelected: Dispatch<SetStateAction<boolean>>;
  analyticsId: string;
  saveAnalyticsId: Dispatch<SetStateAction<string>>;
  bearerToken: string;
  saveBearerToken: Dispatch<SetStateAction<string>>;
  isCustomiseMessageVisible: boolean;
  toggleCustomiseMessageVisibility: Dispatch<SetStateAction<boolean>>;
  longUniqueId: number;
  saveLongUniqueId: Dispatch<SetStateAction<number>>;
}
