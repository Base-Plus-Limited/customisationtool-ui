import React, { createContext, SetStateAction, useState } from 'react';
import IErrorResponse from './Interfaces/ErrorResponse'
import ICustomiseContext from './Interfaces/CustomiseState';
import ICategorisedIngredient from './Interfaces/CategorisedIngredient';

const state: ICustomiseContext = {
  applicationError: {} as IErrorResponse,
  setApplicationError: (previousApplicationError: SetStateAction<IErrorResponse>) => previousApplicationError,
  categorisedIngredients: [],
  saveCategorisedIngredients: (previousIngredients: SetStateAction<ICategorisedIngredient[]>) => previousIngredients
}

export const CustomiseContext = createContext(state);

interface CustomiseProviderProps {
}
 
export const CustomiseProvider: React.SFC<CustomiseProviderProps> = ({ children }) => {

  const [applicationError, setApplicationError] = useState<IErrorResponse>({} as IErrorResponse);
  const [categorisedIngredients, saveCategorisedIngredients] = useState<ICategorisedIngredient[]>([]);

  return (
    <CustomiseContext.Provider value={{
      applicationError,
      setApplicationError,
      categorisedIngredients,
      saveCategorisedIngredients
    }}>
      {children}
    </CustomiseContext.Provider>
  );
}
 
