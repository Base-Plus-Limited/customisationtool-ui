import * as React from 'react';
import styled from 'styled-components';

export interface ButtonProps {
  onClick: () => void;
  children?: any;
  selected?: boolean;
  disabled?: boolean;
  addTransparency?: boolean;
}


const StyledButton: React.SFC<ButtonProps> = ({ onClick, children, selected, disabled, addTransparency }) => (
  <Button className={`${selected ? "selected" : ""} ${addTransparency ? "grey" : ""} `} disabled={disabled} onClick={onClick}>
    {children}
  </Button>
)

const Button = styled.button`
  background: ${props => props.theme.brandColours.baseDarkGreen};
  font-size: 9pt;
  font-family: ${props => props.theme.subHeadingFont};
  text-transform: uppercase;
  color: #fff;
  display: inline-block;
  border: none;
  outline: none;
  -webkit-tap-highlight-color: transparent;
  margin: 0;
  border-radius: 0px;
  padding: 8px 12px;
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

const FooterButton = styled.button`
  font-size: 9pt;
  font-family: ${props => props.theme.subHeadingFont};
  text-transform: uppercase;
  background: #fff;
  display: inline-block;
  outline: none;
  -webkit-tap-highlight-color: transparent;
  margin: 0;
  border-radius: 0px;
  &:focus{
    outline: none;
  }
  border: none;
  border-left: solid 1px ${props => props.theme.brandColours.baseDarkGreen};
  padding: 3vh 0;
  width: 35%;
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

export {StyledButton, FooterButton};