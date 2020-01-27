import * as React from 'react';
import styled from 'styled-components';

export interface TextProps {
  children: any;
}
 
const StyledText: React.SFC<TextProps> = ({children}) => (
  <Text>{children}</Text>
)

const Text = styled.p`
  color: ${props => props.theme.brandColours.baseDarkGreen};
  font-family: ${props => props.theme.subHeadingFont};
  margin: 0;
`

const Message = styled(Text)`
  background: ${props => props.theme.brandColours.basePink};
  color: #fff;
  margin: -20px 0 15px 0;
  grid-column: 1/ span 2;
  text-align: center;
  padding: 10px 0;
  font-size: 9pt;
  letter-spacing: 0.04em;
  text-transform: uppercase;
`

 
export {StyledText, Message};