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

 
export default StyledText;