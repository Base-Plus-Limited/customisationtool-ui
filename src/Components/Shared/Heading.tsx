import * as React from 'react';
import styled from 'styled-components';

export interface HeadingProps {
  children: any;
  selected: boolean;
  onClick: () => void
}
 
const StyledHeading: React.SFC<HeadingProps> = ({children, selected, onClick}) => (
  <Heading onClick={onClick}><span className={selected ? "selected" : ""}>{children}</span></Heading>
)

const Heading = styled.h2`
  color: ${props => props.theme.brandColours.baseDarkGreen};
  font-family: ${props => props.theme.subHeadingFont};
  font-size: 10.8pt;
  letter-spacing: 0.03em;
  text-align: center;
  text-transform: uppercase;
  padding: 20px 0;
  margin: 0;
  span {
    opacity: 0.4;
    padding-bottom: 2px;
  }
  .selected{
    opacity: 1;
    border-bottom: solid 3px ${props => props.theme.brandColours.baseLightGreen};
  }
  ${props => props.theme.mediaQueries.tablet} {
    text-align: left;
    padding-left: 20px;
  }
`

 
export default StyledHeading;