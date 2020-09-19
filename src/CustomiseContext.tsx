import React, { createContext, SetStateAction, useState } from 'react';
import IErrorResponse from './Interfaces/ErrorResponse'
import ICustomiseContext from './Interfaces/CustomiseState';
import ICategorisedIngredient from './Interfaces/CategorisedIngredient';
import { ISelectableProduct } from './Interfaces/WordpressProduct';
import { IHeading } from './Interfaces/Heading';
import { FragranceAnswer, IFragranceData } from './Interfaces/FragranceData';

const state: ICustomiseContext = {
  hasApplicationErrored: {} as IErrorResponse,
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
  updateHeadings: (previousHeadings: SetStateAction<IHeading[]>) => previousHeadings,
  baseProduct: {} as ISelectableProduct,
  saveBaseProduct: (previousBase: SetStateAction<ISelectableProduct>) => previousBase,
  userName: "",
  saveUserName: (previousUserName: SetStateAction<string>) => previousUserName,
  isProductBeingAmended: false,
  updateIsProductBeingAmended: (previousProductBeingAmended: SetStateAction<boolean>) => previousProductBeingAmended,
  isCheckoutButtonSelected: false,
  updateIsCheckoutButtonSelected: (previousIsCheckoutButtonSelected: SetStateAction<boolean>) => previousIsCheckoutButtonSelected,
  uniqueId: "",
  saveUniqueId: (previousUniqueId: SetStateAction<string>) => previousUniqueId,
  bearerToken: "",
  saveBearerToken: (previousBearerToken: SetStateAction<string>) => previousBearerToken,
  isCustomiseMessageVisible: false,
  toggleCustomiseMessageVisibility: (previousMessageVisibility: SetStateAction<boolean>) => previousMessageVisibility,
  tempProductId: 0,
  saveTempProductId: (previousId: SetStateAction<number>) => previousId,
  fragranceData: {} as IFragranceData,
  updateFragranceData: (previousFragranceData: SetStateAction<IFragranceData>) => previousFragranceData,
}

export const CustomiseContext = createContext(state);

interface CustomiseProviderProps {
}

export const CustomiseProvider: React.SFC<CustomiseProviderProps> = ({ children }) => {

  const [hasApplicationErrored, setApplicationError] = useState<IErrorResponse>({} as IErrorResponse);
  const [categorisedIngredients, updateCategorisedIngredients] = useState<ICategorisedIngredient[]>([]);
  const [selectedIngredients, updateSelectedIngredients] = useState<ISelectableProduct[]>([]);
  const [isDescriptionVisible, toggleDescriptionVisibility] = useState<boolean>(false);
  const [currentMixture, addToMixture] = useState<ISelectableProduct[]>([]);
  const [userName, saveUserName] = useState<string>("");
  const [headings, updateHeadings] = useState<IHeading[]>([
    {
      headingText: "Selection",
      desktopText: "Skin Concerns",
      selected: true,
      id: 0
    },
    {
      headingText: "Summary",
      selected: false,
      id: 1
    }
  ]);
  const [baseProduct, saveBaseProduct] = useState<ISelectableProduct>({} as ISelectableProduct);
  const [isProductBeingAmended, updateIsProductBeingAmended] = useState<boolean>(false);
  const [isCheckoutButtonSelected, updateIsCheckoutButtonSelected] = useState<boolean>(false);
  const [uniqueId, saveUniqueId] = useState<string>("");
  const [bearerToken, saveBearerToken] = useState<string>("");
  const [isCustomiseMessageVisible, toggleCustomiseMessageVisibility] = useState<boolean>(false);
  const [tempProductId, saveTempProductId] = useState<number>(0);
  const [fragranceData, updateFragranceData] = useState<IFragranceData>({
    question: "Fragrance free?",
    answers: [
      {
        answer: "Yes",
        id: FragranceAnswer.Yes,
        selected: false
      },
      {
        answer: "No",
        id: FragranceAnswer.No,
        selected: false
      }
    ]
  });

  return (
    <CustomiseContext.Provider value={{
      hasApplicationErrored,
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
      updateHeadings,
      baseProduct,
      saveBaseProduct,
      userName,
      saveUserName,
      isProductBeingAmended,
      updateIsProductBeingAmended,
      isCheckoutButtonSelected,
      updateIsCheckoutButtonSelected,
      uniqueId,
      saveUniqueId,
      bearerToken,
      saveBearerToken,
      isCustomiseMessageVisible,
      toggleCustomiseMessageVisibility,
      tempProductId,
      saveTempProductId,
      fragranceData,
      updateFragranceData
    }}>
      {children}
    </CustomiseContext.Provider>
  );
}

