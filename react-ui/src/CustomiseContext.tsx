import React, { createContext, SetStateAction, useState } from 'react';
import IErrorResponse from './Interfaces/ErrorResponse'
import ICustomiseContext from './Interfaces/CustomiseState';
import ICategorisedIngredient from './Interfaces/CategorisedIngredient';
import { ISelectableProduct } from './Interfaces/WordpressProduct';

const state: ICustomiseContext = {
  applicationError: {} as IErrorResponse,
  setApplicationError: (previousApplicationError: SetStateAction<IErrorResponse>) => previousApplicationError,
  categorisedIngredients: [],
  updateCategorisedIngredients: (previousIngredients: SetStateAction<ICategorisedIngredient[]>) => previousIngredients,
  selectedIngredients: [],
  updateSelectedIngredients: (previousTotal: SetStateAction<ISelectableProduct[]>) => previousTotal
}

export const CustomiseContext = createContext(state);

interface CustomiseProviderProps {
}
 
export const CustomiseProvider: React.SFC<CustomiseProviderProps> = ({ children }) => {

  const [applicationError, setApplicationError] = useState<IErrorResponse>({} as IErrorResponse);
  const [categorisedIngredients, updateCategorisedIngredients] = useState<ICategorisedIngredient[]>([]);
  const [selectedIngredients, updateSelectedIngredients] = useState<ISelectableProduct[]>([]);

  return (
    <CustomiseContext.Provider value={{
      applicationError,
      setApplicationError,
      categorisedIngredients,
      updateCategorisedIngredients,
      selectedIngredients,
      updateSelectedIngredients
    }}>
      {children}
    </CustomiseContext.Provider>
  );
}
 
