import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import ICategorisedIngredient from '../Interfaces/CategorisedIngredient';
import StyledHeading from './Shared/Heading';

export interface SelectionTableProps {
  categorisedIngredients: ICategorisedIngredient[]
}
 
const SelectionTable: React.SFC<SelectionTableProps> = ({categorisedIngredients}) => {
  return (
    <SelectionWrapper>
      <Categories>
        <StyledHeading>Categories</StyledHeading>
      </Categories>
      <Selection>
        <StyledHeading>Ingredients</StyledHeading>
      </Selection>
      <Summary>
        <StyledHeading>Summary</StyledHeading>
      </Summary>
    </SelectionWrapper>
  )
  // return <p>{categorisedIngredients.map(ingredients => ingredients.category)}</p>
}
 
export default SelectionTable;


const SelectionWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  ${props => props.theme.mediaQueries.tablet} {
    grid-template-columns: 200px 1fr 250px;
  }
`;

const Categories = styled.div`
  border-top: solid 1px ${props => props.theme.brandColours.baseDarkGreen};
  border-bottom: solid 1px ${props => props.theme.brandColours.baseDarkGreen};
  grid-row: 2;
  grid-column: 1/ span 2;
  width: 100%;
  ${props => props.theme.mediaQueries.tablet} {
    border: none;
    border-right: solid 1px ${props => props.theme.brandColours.baseDarkGreen};
    grid-column: 1;
  }
`;
  
  
const Summary = styled.div`
  border-left: solid 1px ${props => props.theme.brandColours.baseDarkGreen};
  grid-row: 1;
  grid-column: 2;
  ${props => props.theme.mediaQueries.tablet} {
    grid-column: 3;
    grid-row: 1 / span 2;
    h2{
      border-bottom: solid 1px ${props => props.theme.brandColours.baseDarkGreen};
    }
  }
`;
  
const Selection = styled.div`
  grid-row: 1
  grid-column: 1;
  ${props => props.theme.mediaQueries.tablet} {
    border-bottom: solid 1px ${props => props.theme.brandColours.baseDarkGreen};
    grid-column: 1 /span 2;
  }
`;