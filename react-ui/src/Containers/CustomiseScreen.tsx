import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { CustomiseContext } from '../CustomiseContext';
import ICategorisedIngredient from '../Interfaces/CategorisedIngredient';
import SelectionTable from '../Components/SelectionTable';

export interface CustomiseScreenProps {

}

const StyledCustomiseScreen: React.SFC<CustomiseScreenProps> = () => {

  const { saveCategorisedIngredients, categorisedIngredients, setApplicationError } = useContext(CustomiseContext);

  useEffect(() => {
    fetch('/api/ingredients')
      .then(res => res.ok ? res.json() : res.json().then(errorResponse => setApplicationError(errorResponse)))
      .then((categorisedIngredients: ICategorisedIngredient[]) => saveCategorisedIngredients(categorisedIngredients))
      .catch((error) => {
        setApplicationError({
          error: true,
          code: error.status,
          message: error.message
        })
      });
  }, [saveCategorisedIngredients, setApplicationError]);

  return (
    <CustomiseScreen>
      <SelectionTable categorisedIngredients={categorisedIngredients}></SelectionTable>
    </CustomiseScreen>
  );
}

const CustomiseScreen = styled.div`

`;

export default StyledCustomiseScreen;