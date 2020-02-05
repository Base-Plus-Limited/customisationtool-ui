import * as React from 'react';
import styled from 'styled-components';

export interface ButtonProps {
  onClick: () => void;
  children?: any;
}


const StyledButton: React.SFC<ButtonProps> = ({ onClick, children }) => (
  <Button onClick={onClick}>
    {children}
  </Button>
)

const Button = styled.button`
  border: solid 1px ${props => props.theme.brandColours.baseDarkGreen};
  font-size: 9pt;
  font-family: ${props => props.theme.subHeadingFont};
  text-transform: uppercase;
  background: #fff;
  display: inline-block;
  outline: none;
  -webkit-tap-highlight-color: transparent;
  margin: 0;
  border-radius: 0px;
  padding: 4px 8px;
  &:focus{
    outline: none;
  }
  ${props => props.theme.mediaQueries.tablet} {
    font-size: 8pt;
    margin: 15px 0 0 0;
    width: auto;
    border: solid 2px ${props => props.theme.brandColours.baseDarkGreen};
    grid-template-rows: auto 1fr;
    grid-template-columns: 200px 1fr 300px;
    padding: 8px 14px;
  }
`


const FooterButton = styled(Button)`
  border: none;
  border-left: solid 1px ${props => props.theme.brandColours.baseDarkGreen};
  padding: 3vh 0;
  width: 34%;
  ${props => props.theme.mediaQueries.tablet} {
    font-size: 8pt;
    margin: 15px 0 0 0;
    padding: 8px 14px;
    border: solid 2px ${props => props.theme.brandColours.baseDarkGreen};
    grid-template-rows: auto 1fr;
    grid-template-columns: 200px 1fr 300px;
  }
`

export {StyledButton, FooterButton};