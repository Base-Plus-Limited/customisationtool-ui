import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { CustomiseContext } from '../CustomiseContext';
import ICategorisedIngredient from '../Interfaces/CategorisedIngredient';
import SelectionTable from '../Components/SelectionTable';

import { getUniqueIngredients } from '../Helpers/Helpers';
import { ISelectableProduct } from '../Interfaces/WordpressProduct';

export interface CustomiseScreenProps {

}

const StyledCustomiseScreen: React.SFC<CustomiseScreenProps> = () => {

  const { updateCategorisedIngredients, categorisedIngredients, setApplicationError, saveBaseProduct, baseProduct, saveUserName, updateIsProductBeingAmended, addToMixture } = useContext(CustomiseContext);

  useEffect(() => {
    fetch('/api/ingredients')
      .then(res => res.ok ? res.json() : res.json().then(errorResponse => setApplicationError(errorResponse)))
      .then((categorisedIngredients: ICategorisedIngredient[]) => {
        const filteredCategories = categorisedIngredients.filter(category => category.id !== 1474);
        processUrlParams(filteredCategories.flatMap(category => category.ingredients));
        updateCategorisedIngredients(
          filteredCategories.map(category => {
            if (category.selected)
              category.ingredients[0].selected = true;
            return category;
          })
        );
        saveBaseProduct(categorisedIngredients.filter(category => category.id === 1474)[0].ingredients[0]);
      })
      .catch((error) => {
        setApplicationError({
          error: true,
          code: error.status,
          message: error.message
        })
      });
  }, [updateCategorisedIngredients, setApplicationError, saveBaseProduct]);

  const processUrlParams = (ingredients: ISelectableProduct[]) => {
    const params = new URLSearchParams(window.location.search.substring(1));
    const productIds: number[] = [Number(params.get('productone')), Number(params.get('producttwo'))];
    const userName = params.get('username');

    if(userName !== null)
      saveUserName(userName);

    if (productIds.some(urlProductId => urlProductId !== 0)) {
      addToMixture(getUniqueIngredients(ingredients.filter(ingredient => productIds.includes(ingredient.id))));
      updateIsProductBeingAmended(true);
      // TODO: Replace url params
      // window.location.replace('https://baseplus.co.uk/customise');
      // http://localhost:3000/?productone=696&producttwo=695&username=tess
    }
  }

  return (
    <CustomiseScreen>
      <SelectionTable categorisedIngredients={categorisedIngredients} baseProduct={baseProduct}></SelectionTable>
    </CustomiseScreen>
  );
}

const CustomiseScreen = styled.div`

`;

export default StyledCustomiseScreen;