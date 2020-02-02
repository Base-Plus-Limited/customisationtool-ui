import * as React from 'react';
import styled from 'styled-components';
import { CustomiseContext } from '../CustomiseContext';
import { useContext } from 'react';

export interface AddToCartProps {
  onClick?: () => void;
  isIngredientAlreadyAdded?: boolean;
}

const StyledAddToCart: React.SFC<AddToCartProps> = ({onClick, isIngredientAlreadyAdded}) => {

  const { currentMixture } = useContext(CustomiseContext);

  const toggleButtonText = () => currentMixture.length !== 2 ? showRemoveOrAdd() : "view summary";

  const showRemoveOrAdd = () => isIngredientAlreadyAdded ? "Remove -" : "Add +";

  return <AddToCart className={isIngredientAlreadyAdded ? "isIngredientAlreadyAdded addToCart" : "addToCart"} onClick={onClick}>
    {toggleButtonText()}
  </AddToCart>
}
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