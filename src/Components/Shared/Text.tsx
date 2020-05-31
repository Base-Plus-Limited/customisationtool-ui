import * as React from 'react';
import styled from 'styled-components';

export interface TextProps {
  children: any;
  onClick?: () => void;
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
  background: ${props => props.theme.brandColours.baseLightGreen};
  color: ${props => props.theme.brandColours.baseDarkGreen};
  grid-column: 1/ span 2;
  text-align: center;
  padding: 10px 0;
  font-size: 9pt;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  ${props => props.theme.mediaQueries.tablet} {
    border-left: solid 1px ${props => props.theme.brandColours.baseDarkGreen};
  }
`
const SummaryPriceRow = styled(Text)`
  width: 100%;
  max-width: 70%;
  padding: 10px 0;
  margin: 0 auto;
  text-align: left;
  font-size: 9pt;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  span{
    float: right;
  }
`

const TotalPriceRow = styled(SummaryPriceRow)`
  border-top: solid 1px ${props => props.theme.brandColours.basePink};
  color: ${props => props.theme.brandColours.basePink};
  padding: 15px 0;
  margin: 5px auto 30px;
`

const LoadingMessage = styled(Text)`
  text-align: center;
`

const InfoMessageForAmendingUsers = styled(Text)`
  color: #C06F78;
  margin: 0px 0 70px;
  text-align: center;
`


 
export {StyledText, Message, SummaryPriceRow, TotalPriceRow, LoadingMessage, InfoMessageForAmendingUsers};