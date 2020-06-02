import * as React from 'react';
import styled from 'styled-components';

export interface CategoryProps {
  children: any;
  selected: boolean;
  selectCategory: () => void;
}

const StyledCategory: React.SFC<CategoryProps> = ({children, selectCategory, selected}) => (
  <Category onClick={selectCategory}>
    <CategorySpan className={selected ? "selected" : ""}>{children}</CategorySpan> 
  </Category>
)

const Category = styled.p`
  color: ${props => props.theme.brandColours.baseDarkGreen};
  font-family: ${props => props.theme.subHeadingFont};
  font-size: 10pt;
  letter-spacing: 0.03em;
  text-align: center;
  text-transform: uppercase;
  padding: 20px 16px;
  margin: 0;
  display: inline-block;
  cursor: pointer;
  ${props => props.theme.mediaQueries.tablet} {
    display: block;
    text-align:left;
  }
  .selected{
    border-bottom: solid 3px ${props => props.theme.brandColours.baseLightGreen};
  }
`

const CategorySpan = styled.span`
  white-space: nowrap;
  padding-bottom: 2px;
`
export default StyledCategory;