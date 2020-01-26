import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { CustomiseContext } from '../CustomiseContext';
import WordpressProduct from './../Interfaces/WordpressProduct';
import { ICategory } from '../Interfaces/Tag';
import ICategorisedIngredient from '../Interfaces/CategorisedIngredient';
import SelectionTable from '../Components/SelectionTable';

export interface CustomiseScreenProps {

}

const StyledCustomiseScreen: React.SFC<CustomiseScreenProps> = () => {

  const { saveCategorisedIngredients, categorisedIngredients, setApplicationError } = useContext(CustomiseContext);

  useEffect(() => {
    fetch('/api/ingredients')
      .then(res => res.ok ? res.json() : res.json().then(errorResponse => setApplicationError(errorResponse)))
      .then((categorisedIngredients: ICategorisedIngredient[]) => {
          saveCategorisedIngredients(categorisedIngredients);
      })
      .catch((error) => {
        setApplicationError({
          error: true,
          code: error.status,
          message: error.message
        })
      });
  }, [saveCategorisedIngredients, setApplicationError]);

  const returnCategorisedIngredients = (categories: ICategory[], ingredients: WordpressProduct[]): ICategorisedIngredient[] => {
    return categories.map(category => {
      const categorisedIngredients = ingredients.flatMap(ingredient => {
        return ingredient.tags.map(tag => {
          if(category.id === tag.id)
            return ingredient;
        })
      }).filter(product => product !== undefined) as WordpressProduct[];
      return {
        category: capitaliseFirstLetter(category.name),
        id: category.id,
        ingredients: categorisedIngredients,
        count: categorisedIngredients.length
      }
    });
  }

  const capitaliseFirstLetter = (category: string) => {
    return category[0].toUpperCase() + category.substr(1);
  }

  

  return (
    <CustomiseScreen>
      <SelectionTable categorisedIngredients={categorisedIngredients}></SelectionTable>
    </CustomiseScreen>
  );
}

const CustomiseScreen = styled.div`

`;

export default StyledCustomiseScreen;