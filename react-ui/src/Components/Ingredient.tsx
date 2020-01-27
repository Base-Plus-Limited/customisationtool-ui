import * as React from 'react';
import styled from 'styled-components';
import { ISelectableProduct } from '../Interfaces/WordpressProduct';

export interface IngredientProps {
  ingredient: ISelectableProduct;
  selectIngredient: () => void;
}

const StyledIngredient: React.SFC<IngredientProps> = ({selectIngredient, ingredient}) => (
  <IngredientWrap className={ingredient.selected ? "selected" : ""} onClick={selectIngredient}>
    <img width={120} src={ingredient.images[0].src} alt={ingredient.name + " image"}/>
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
  cursor: pointer;
  opacity: 0.7;
`
export default StyledIngredient;