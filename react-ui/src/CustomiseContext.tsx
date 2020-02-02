import React, { createContext, SetStateAction, useState } from 'react';
import IErrorResponse from './Interfaces/ErrorResponse'
import ICustomiseContext from './Interfaces/CustomiseState';
import ICategorisedIngredient from './Interfaces/CategorisedIngredient';
import { ISelectableProduct } from './Interfaces/WordpressProduct';
import { IHeading } from './Interfaces/Heading';

const state: ICustomiseContext = {
  applicationError: {} as IErrorResponse,
  setApplicationError: (previousApplicationError: SetStateAction<IErrorResponse>) => previousApplicationError,
  categorisedIngredients: [],
  updateCategorisedIngredients: (previousIngredients: SetStateAction<ICategorisedIngredient[]>) => previousIngredients,
  selectedIngredients: [],
  updateSelectedIngredients: (previousTotal: SetStateAction<ISelectableProduct[]>) => previousTotal,
  isDescriptionVisible: false,
  toggleDescriptionVisibility: (previousVisibility: SetStateAction<boolean>) => previousVisibility,
  currentMixture: [],
  addToMixture: (previousMixture: SetStateAction<ISelectableProduct[]>) => previousMixture,
  headings: [],
  updateHeadings: (previousHeadings: SetStateAction<IHeading[]>) => previousHeadings
}

export const CustomiseContext = createContext(state);

interface CustomiseProviderProps {
}
 
export const CustomiseProvider: React.SFC<CustomiseProviderProps> = ({ children }) => {

  const [applicationError, setApplicationError] = useState<IErrorResponse>({} as IErrorResponse);
  const [categorisedIngredients, updateCategorisedIngredients] = useState<ICategorisedIngredient[]>([]);
  const [selectedIngredients, updateSelectedIngredients] = useState<ISelectableProduct[]>([]);
  const [isDescriptionVisible, toggleDescriptionVisibility] = useState<boolean>(false);
  const [currentMixture, addToMixture] = useState<ISelectableProduct[]>([]);
  const [headings, updateHeadings] = useState<IHeading[]>([
    {
      headingText: "Selection",
      selected: true,
      id: 0
    },
    {
      headingText: "Summary",
      selected: false,
      id: 1
    }
  ]);

  return (
    <CustomiseContext.Provider value={{
      applicationError,
      setApplicationError,
      categorisedIngredients,
      updateCategorisedIngredients,
      selectedIngredients,
      updateSelectedIngredients,
      isDescriptionVisible,
      toggleDescriptionVisibility,
      currentMixture,
      addToMixture,
      headings,
      updateHeadings
    }}>
      {children}
    </CustomiseContext.Provider>
  );
}
 
