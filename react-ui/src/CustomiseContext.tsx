import React, { createContext, SetStateAction, useState } from 'react';
import IErrorResponse from './Interfaces/ErrorResponse'
import ICustomiseContext from './Interfaces/CustomiseState';
import ICategorisedIngredient from './Interfaces/CategorisedIngredient';

const state: ICustomiseContext = {
  applicationError: {} as IErrorResponse,
  setApplicationError: (previousApplicationError: SetStateAction<IErrorResponse>) => previousApplicationError,
  categorisedIngredients: [],
  updateCategorisedIngredients: (previousIngredients: SetStateAction<ICategorisedIngredient[]>) => previousIngredients,
  totalIngredientsSelected: 0,
  updateTotalIngredientsSelected: (previousTotal: SetStateAction<number>) => previousTotal
}

export const CustomiseContext = createContext(state);

interface CustomiseProviderProps {
}
 
export const CustomiseProvider: React.SFC<CustomiseProviderProps> = ({ children }) => {

  const [applicationError, setApplicationError] = useState<IErrorResponse>({} as IErrorResponse);
  const [categorisedIngredients, updateCategorisedIngredients] = useState<ICategorisedIngredient[]>([]);
  const [totalIngredientsSelected, updateTotalIngredientsSelected] = useState<number>(0);

  return (
    <CustomiseContext.Provider value={{
      applicationError,
      setApplicationError,
      categorisedIngredients,
      updateCategorisedIngredients,
      totalIngredientsSelected,
      updateTotalIngredientsSelected
    }}>
      {children}
    </CustomiseContext.Provider>
  );
}
 
