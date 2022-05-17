import styled from 'styled-components';

export const H3 = styled.h3`
  color: ${props => props.color ?? props.theme.colors.secondary};
  font-family: ${props => props.theme.fonts.heading.fontFamily};
  font-size: ${props => props.theme.fonts.heading.fontSize}px;
  font-weight: ${props => props.theme.fonts.heading.fontWeight};
  line-height: ${props => props.theme.fonts.heading.lineHeight}px;
  margin-right: 25px;
  text-align: left;
`;
