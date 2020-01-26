import * as React from 'react';
import styled from 'styled-components';

export interface HeadingProps {
  children: any;
}
 
const StyledHeading: React.SFC<HeadingProps> = ({children}) => (
  <Heading><span>{children}</span></Heading>
)

const Heading = styled.h2`
  color: ${props => props.theme.brandColours.baseDarkGreen};
  font-family: ${props => props.theme.subHeadingFont};
  font-size: 10pt;
  letter-spacing: 0.03em;
  text-align: center;
  text-transform: uppercase;
  padding: 20px 0;
  margin: 0;
  span {
    padding-bottom: 2px;
    border-bottom: solid 3px ${props => props.theme.brandColours.baseLightGreen};
    ${props => props.theme.mediaQueries.tablet} {
      padding-bottom: 0;
      border-bottom: none;
    }
  }
`

 
export default StyledHeading;