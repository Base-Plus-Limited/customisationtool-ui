import * as React from 'react';
import styled from 'styled-components';

export interface SelectedIngredientProps {
  removeFromCart: () => void;
  ingredientName: string;
}

const StyledSelectedIngredient: React.SFC<SelectedIngredientProps> = ({ingredientName, removeFromCart}) => (
  <SelectedIngredient onClick={removeFromCart}><Close>X</Close>{ingredientName}</SelectedIngredient>
)

const SelectedIngredient = styled.span`
  font-size: 9pt;
  font-family: ${props => props.theme.subHeadingFont};
  text-transform: uppercase;
  display: inline-block;
  padding-right: 7px;
  margin: 0 0 30px 0;
  cursor: pointer;
  &:hover{
    color: ${props => props.theme.brandColours.basePink};
    text-decoration: line-through;
  }
`
  
  const Close = styled.span`
  color: ${props => props.theme.brandColours.basePink};
  font-size: 9pt;
  font-family: ${props => props.theme.subHeadingFont};
  text-transform: uppercase;
  display: inline-block;
  padding: 5px 3px 5px 0;
  margin: 0 6px 0 0;
`

export default StyledSelectedIngredient;