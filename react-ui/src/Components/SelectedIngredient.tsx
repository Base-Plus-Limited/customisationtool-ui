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
  border: solid 1px ${props => props.theme.brandColours.baseDarkGreen};
  font-size: 9pt;
  font-family: ${props => props.theme.subHeadingFont};
  text-transform: uppercase;
  display: inline-block;
  padding-right: 7px;
  margin: 0 15px 30px 0;
`
  
  const Close = styled.span`
  border-right: solid 1px ${props => props.theme.brandColours.baseDarkGreen};
  font-size: 9pt;
  font-family: ${props => props.theme.subHeadingFont};
  text-transform: uppercase;
  display: inline-block;
  padding: 5px 7px;
  margin: 0 6px 0 0;
`

export default StyledSelectedIngredient;