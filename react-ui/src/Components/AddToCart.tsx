import * as React from 'react';
import styled from 'styled-components';

export interface AddToCartProps {
  selectAddToCart: () => void;
  isIngredientAlreadyAdded: boolean;
}

const StyledAddToCart: React.SFC<AddToCartProps> = ({selectAddToCart, isIngredientAlreadyAdded}) => (
  <AddToCart className={isIngredientAlreadyAdded ? "isIngredientAlreadyAdded addToCart" : "addToCart"} onClick={selectAddToCart}>
    {isIngredientAlreadyAdded ? "Remove -" : "Add to recipe +"}
    </AddToCart>
)

const AddToCart = styled.span`
  border-left: solid 1px ${props => props.theme.brandColours.baseDarkGreen};
  padding: 3vh 0;
  width: 30%;
  font-size: 9pt;
  font-family: ${props => props.theme.subHeadingFont};
  text-transform: uppercase;
  display: inline-block;
  ${props => props.theme.mediaQueries.tablet} {
    font-size: 8pt;
    margin: 15px 0 0 0;
    padding: 4px 8px;
    border: solid 2px ${props => props.theme.brandColours.baseDarkGreen};
    grid-template-rows: auto 1fr;
    grid-template-columns: 200px 1fr 300px;
  }
`

export default StyledAddToCart;