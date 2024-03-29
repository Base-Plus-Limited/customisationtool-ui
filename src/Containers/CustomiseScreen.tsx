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
import { generateAnalyticsId, track } from '../Components/Analytics';
import { LoadingMessage, InfoMessageForAmendingUsers } from '../Components/Shared/Text';
import { MoisturiserSize } from '../Interfaces/MoisturiserSize';

export interface CustomiseScreenProps {

}

const StyledCustomiseScreen: React.SFC<CustomiseScreenProps> = () => {

  const { updateCategorisedIngredients, categorisedIngredients, setApplicationError, saveBaseProduct, baseProduct, saveUserName, updateIsProductBeingAmended, addToMixture, hasApplicationErrored, saveAnalyticsId, saveBearerToken, userName, currentMixture, isProductBeingAmended, isCustomiseMessageVisible, toggleCustomiseMessageVisibility, saveLongUniqueId, saveMoisturiserSize } = useContext(CustomiseContext);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/get-token`)
    .then(res => res.ok ? res.json() : res.json().then(errorResponse => setApplicationError({
      error: true,
      code: errorResponse.status,
      message: errorResponse.message
    })))
    .then(response => {
      saveBearerToken(response.token);
      fetch(`${process.env.REACT_APP_SERVER_URL}/ingredients`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + response.token
        }
      })
      .then(res => res.ok ? res.json() : res.json().then(errorResponse => setApplicationError(errorResponse)))
      .then((categorisedIngredients: ICategorisedIngredient[]) => {
        const filteredCategories = categorisedIngredients.filter(category => category.id !== 1474);
        processUrlParams(filteredCategories.flatMap(category => category.ingredients), response.token);
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
    })
    .catch((error) => {
      setApplicationError({
        error: true,
        code: error.status,
        message: error.message
      })
    });

    
  }, [updateCategorisedIngredients, setApplicationError, saveBaseProduct, saveBearerToken]);

  const processUrlParams = (ingredients: ISelectableProduct[], bearer: string) => {
    const params = new URLSearchParams(window.location.search.substring(1));
    const productIds: number[] = [Number(params.get('productone')), Number(params.get('producttwo'))];
    const userName = params.get('username');
    const longUniqueId = params.get('longuniqueid');
    const moisturiserSize = (params.get('size') as MoisturiserSize);
    const analyticsId = String(params.get('analyticsid') === null ? generateAnalyticsId() : params.get('analyticsid'));
    saveAnalyticsId(analyticsId);
    saveMoisturiserSize(moisturiserSize ? moisturiserSize : "30ml");

    if(longUniqueId !== null) {
      saveLongUniqueId(Number(longUniqueId));
    } else {
      saveLongUniqueId(generateLongUniqueId());
    }
    if(userName !== null)
      saveUserName(userName);
    if (productIds.some(urlProductId => urlProductId !== 0)) {
      addToMixture(getUniqueIngredients(ingredients.filter(ingredient => productIds.includes(ingredient.id))));
      updateIsProductBeingAmended(true);
      toggleCustomiseMessageVisibility(true);
      window.history.pushState({}, document.title, window.location.href.split("?")[0]);
    }
    track({
      distinct_id: analyticsId,
      event_type: "Customisation started"
    }, bearer);
  }

  const generateLongUniqueId = () => {
    return Number(Math.random().toString().split('.')[1].slice(0,5));
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
            {
              isProductBeingAmended && isCustomiseMessageVisible &&
                <InfoMessageForAmendingUsers>{`Hey, ${userName !== "" ? userName : ""} we've preselected your ingredients (${currentMixture.map(ingredient => ingredient.name).join(' & ')}) as a starting point from the product builder. \n Using the customisation tool below, you can amend your final product.`}</InfoMessageForAmendingUsers>
            }
            <SelectionTable categorisedIngredients={categorisedIngredients} baseProduct={baseProduct}></SelectionTable>
          </CustomiseScreen> 
          : <React.Fragment>          
              <LoadingAnimation/>
              <LoadingMessage> Loading the customistation tool...</LoadingMessage>
            </React.Fragment>          
        }
      </React.Fragment>
  );
}

const CustomiseScreen = styled.div`
  height: 100%;
  .addScroll {
    overflow: scroll;
    margin-bottom: 20px;
  }
`;

export default StyledCustomiseScreen;