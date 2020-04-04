import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { CustomiseContext } from '../CustomiseContext';
import ICategorisedIngredient from '../Interfaces/CategorisedIngredient';
import SelectionTable from '../Components/SelectionTable';
import LoadingAnimation from './../Components/LoadingAnimation';
import { getUniqueIngredients } from '../Helpers/Helpers';
import { ISelectableProduct } from '../Interfaces/WordpressProduct';
import StyledErrorScreen from '../Components/ErrorScreen';
import IErrorResponse from '../Interfaces/ErrorResponse';
import { generateUniqueId, track } from '../Components/Analytics';

export interface CustomiseScreenProps {

}

const StyledCustomiseScreen: React.SFC<CustomiseScreenProps> = () => {

  const { updateCategorisedIngredients, categorisedIngredients, setApplicationError, saveBaseProduct, baseProduct, saveUserName, updateIsProductBeingAmended, addToMixture, hasApplicationErrored, uniqueId, saveUniqueId } = useContext(CustomiseContext);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_URL}/ingredients`)
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
    const uniqueId = String(params.get('uniqueid') === null ? generateUniqueId() : params.get('uniqueid'));
    saveUniqueId(uniqueId);

    if(userName !== null)
      saveUserName(userName);
    if (productIds.some(urlProductId => urlProductId !== 0)) {
      addToMixture(getUniqueIngredients(ingredients.filter(ingredient => productIds.includes(ingredient.id))));
      updateIsProductBeingAmended(true);
      // TODO: Replace url params
      // window.location.replace('https://baseplus.co.uk/customise');
      // http://localhost:3000/?productone=696&producttwo=695&username=tess
    }
    track({
      distinct_id: uniqueId,
      event_type: "Customisation started"
    });
  }

  const getErrorMessage = (error: IErrorResponse) => {
    return `${hasApplicationErrored.uiMessage && hasApplicationErrored.uiMessage.length > 0 ? `${hasApplicationErrored.uiMessage}` : "We're unable to load the customisation tool at the moment, please try again later"}`
  }

  return (
    hasApplicationErrored.error ? 
      <StyledErrorScreen message={getErrorMessage(hasApplicationErrored)}></StyledErrorScreen> :
    <React.Fragment>
      {
        categorisedIngredients.length > 0 ?
        <CustomiseScreen>
          <SelectionTable categorisedIngredients={categorisedIngredients} baseProduct={baseProduct}></SelectionTable>
        </CustomiseScreen> 
        : <LoadingAnimation/>
      }
      
    </React.Fragment>
  );
}

const CustomiseScreen = styled.div`

`;

export default StyledCustomiseScreen;