import React, { createContext, SetStateAction, useState } from 'react';
import IWordpressProduct from './Interfaces/WordpressProduct';
import IErrorResponse from './Interfaces/ErrorResponse'
import ICustomiseContext from './Interfaces/CustomiseState';

const state: ICustomiseContext = {
  applicationError: {} as IErrorResponse,
  setApplicationError: (previousApplicationError: SetStateAction<IErrorResponse>) => previousApplicationError,
  ingredients: [],
  saveIngredients: (previousIngredients: SetStateAction<IWordpressProduct[]>) => previousIngredients
}

export const CustomiseContext = createContext(state);

interface CustomiseProviderProps {
}
 
export const CustomiseProvider: React.SFC<CustomiseProviderProps> = ({ children }) => {

  const [applicationError, setApplicationError] = useState<IErrorResponse>({} as IErrorResponse);
  const [ingredients, saveIngredients] = useState<IWordpressProduct[]>([]);

  return (
    <CustomiseContext.Provider value={{
      applicationError,
      setApplicationError,
      ingredients,
      saveIngredients
    }}>
      {children}
    </CustomiseContext.Provider>
  );
}
 
