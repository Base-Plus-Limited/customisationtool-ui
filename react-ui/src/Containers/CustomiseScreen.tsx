import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { CustomiseContext } from '../CustomiseContext';
import WordpressProduct from './../Interfaces/WordpressProduct';
import { ICategory } from '../Interfaces/Tag';

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
        const categories = returnUniqueCategories(filteredIngredients.flatMap(ingredient => ingredient.tags.map(tag => (
          {
            name: tag.name,
            id: tag.id
          }
        ))));

        const categorisedIngredients = returnCategoriesWithProducts(categories, ingredients);

        console.log(categorisedIngredients);
      })
      .catch((error) => {
        setApplicationError({
          error: true,
          code: error.status,
          message: error.message
        })
      });
  }, [saveIngredients, setApplicationError]);

  const returnCategoriesWithProducts = (categories: ICategory[], ingredients: WordpressProduct[]) => {
    return categories.map(category => {
      const categorisedProducts = ingredients.flatMap(ingredient => {
        return ingredient.tags.map(tag => {
          if(category.id === tag.id)
            return ingredient;
        })
      }).filter(product => product !== undefined) as WordpressProduct[];
      return {
        category: capitaliseFirstLetter(category.name),
        id: category.id,
        products: categorisedProducts,
        count: categorisedProducts.length
      }
    });
  }

  const capitaliseFirstLetter = (category: string) => {
    return category[0].toUpperCase() + category.substr(1);
  }

  const returnUniqueCategories = (categories: ICategory[]) => {
    return categories.filter((value, index, categories) => categories.findIndex(cat => (cat.id === value.id)) === index);
  }

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