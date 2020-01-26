import * as React from 'react';
import styled from 'styled-components';

export interface CategoryProps {
  children: any;
}
 
const StyledCategory: React.SFC<CategoryProps> = ({children}) => (
  <Category><span>{children}</span></Category>
)

const Category = styled.p`
  color: ${props => props.theme.brandColours.baseDarkGreen};
  font-family: ${props => props.theme.subHeadingFont};
  font-size: 10pt;
  letter-spacing: 0.03em;
  text-align: center;
  text-transform: uppercase;
  padding: 20px;
  margin: 0;
  display: inline-block;
  span {
    white-space: nowrap;
    padding-bottom: 2px;
    // border-bottom: solid 3px ${props => props.theme.brandColours.baseLightGreen};
    ${props => props.theme.mediaQueries.tablet} {
      padding-bottom: 0;
      border-bottom: none;
    }
  }
  ${props => props.theme.mediaQueries.tablet} {
    display: block;
    text-align:left;
  }
`
export default StyledCategory;