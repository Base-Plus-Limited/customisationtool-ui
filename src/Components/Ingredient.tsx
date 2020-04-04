import * as React from 'react';
import styled from 'styled-components';
import { ISelectableProduct } from '../Interfaces/WordpressProduct';

export interface IngredientProps {
  ingredient: ISelectableProduct;
  selectIngredient: () => void;
  isSummaryScreen?: boolean;
}

const StyledIngredient: React.SFC<IngredientProps> = ({selectIngredient, ingredient, isSummaryScreen}) => (
  <IngredientWrap className={ingredient.selected || isSummaryScreen ? "selected" : ""} onClick={selectIngredient}>
    <img src={ingredient.images[0].src} alt={ingredient.name + " image"}/>
    <p>{ingredient.name}</p>
  </IngredientWrap>
)

const IngredientWrap = styled.div`
  color: ${props => props.theme.brandColours.baseDarkGreen};
  font-family: ${props => props.theme.subHeadingFont};
  font-size: 9pt;
  letter-spacing: 0.03em;
  text-align: center;
  text-transform: uppercase;
  padding: 0;
  margin: 0;
  justify-self: center;
  cursor: pointer;
  opacity: 0.7;
  max-width: 120px;
  img{
    width: 100%;
  }
  p{
    margin: 0;
  }
`
export default StyledIngredient;