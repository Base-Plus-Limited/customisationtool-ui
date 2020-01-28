import * as React from 'react';
import styled from 'styled-components';

export interface AddToCartProps {
  selectAddToCart: () => void;
}

const StyledAddToCart: React.SFC<AddToCartProps> = ({selectAddToCart}) => (
  <AddToCart onClick={selectAddToCart}>Add +</AddToCart>
)

const AddToCart = styled.span`
  border: solid 2px ${props => props.theme.brandColours.baseDarkGreen};
  padding: 4px 8px;
  font-size: 8pt;
  font-family: ${props => props.theme.subHeadingFont};
  text-transform: uppercase;
  margin: 15px 0 0 0;
  display: none;
  ${props => props.theme.mediaQueries.tablet} {
    display: inline-block;
    grid-template-rows: auto 1fr;
    grid-template-columns: 200px 1fr 300px;
  }
`

export default StyledAddToCart;