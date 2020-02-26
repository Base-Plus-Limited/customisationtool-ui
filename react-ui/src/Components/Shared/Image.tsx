import * as React from 'react';
import styled from 'styled-components';

export interface ImageProps {
  src: string;
  alt: string;
  width?: number;
}
 
const StyledImage: React.SFC<ImageProps> = ({alt, src, width}) => (
  <Image width={width} src={src} alt={alt}></Image>
)
 
const Image = styled.img`
  max-width: 100%;
`;

export default StyledImage;