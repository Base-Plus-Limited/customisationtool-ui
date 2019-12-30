import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { CustomiseContext } from '../CustomiseContext';
import WordpressProduct from './../Interfaces/WordpressProduct';

export interface CustomiseScreenProps {

}

const StyledCustomiseScreen: React.SFC<CustomiseScreenProps> = () => {

  const { saveIngredients, ingredients, setApplicationError } = useContext(CustomiseContext);

  useEffect(() => {
    fetch('/api/ingredients')
      .then(res => res.ok ? res.json() : res.json().then(errorResponse => setApplicationError(errorResponse)))
      .then((ingredients: WordpressProduct[]) => {
        const filteredIngredients = ingredients.filter(ingredient => ingredient.id !== 1474);
        saveIngredients(filteredIngredients);
        console.log(filteredIngredients);
      })
      .catch((error) => {
        setApplicationError({
          error: true,
          code: error.status,
          message: error.message
        })
      });
  }, [saveIngredients, setApplicationError]);

  return (
    <CustomiseScreen>
      {
        `${ingredients.length} ingredients pulled from wordpress`
      }
    </CustomiseScreen>
  );
}

const CustomiseScreen = styled.div`

`;

export default StyledCustomiseScreen;