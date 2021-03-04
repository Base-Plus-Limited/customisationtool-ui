import * as React from 'react';
import styled from 'styled-components';
import { MoisturiserSize } from '../Interfaces/MoisturiserSize';
import { StyledButton } from './Button';
import { StyledText } from './Shared/Text';

export interface MoisturiserSizesProps {
  onClick: () => void;
  selectedSize: MoisturiserSize;
}


const StyledMoisturiserSizes: React.SFC<MoisturiserSizesProps> = ({onClick, selectedSize}) => (
  <MoisturiserSizeWrap>
    <StyledText>Choose size:</StyledText>
    <div>
      <StyledButton onClick={onClick} selected={selectedSize === "30ml"}>30ml</StyledButton>
      <StyledButton onClick={onClick} selected={selectedSize === "50ml"}>50ml</StyledButton>
    </div>
  </MoisturiserSizeWrap>
)

const MoisturiserSizeWrap = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 80%;
  margin: 20px auto 30px;
  align-items: center;
  button {
    margin: 0;
    background: #fff;
    cursor: pointer;
    color: ${props => props.theme.brandColours.baseDarkGreen};
    border: solid 1px ${props => props.theme.brandColours.baseDarkGreen};
  }
  .selected {
    color: ${props => props.theme.brandColours.basePink};
    border: solid 1px ${props => props.theme.brandColours.basePink};
  }
  button + button {
    margin-left:10px;
  }
`


export default StyledMoisturiserSizes;