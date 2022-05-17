import styled from 'styled-components';

export const StyledExternalAnchor = styled.a.attrs(props => ({
  style: props.inlineStyle
}))`
  color: ${props => props.theme.colors.primary};
  text-decoration: none;
`;
