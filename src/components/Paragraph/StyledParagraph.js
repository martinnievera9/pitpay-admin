import styled, { css } from 'styled-components';
import { StyledText } from '../Text/StyledText';

const sizeStyle = props => {
  const type = props.type || 'body2';
  const data = props.theme.fonts[type];

  if (data) {
    return css`
      font-size: ${data.fontSize};
      line-height: ${data.lineHeight};
      font-weight: ${data.fontWeight};
    `;
  }
};

export const StyledParagraph = styled(StyledText)`
  ${props => sizeStyle(props)}
  display: block;
`;
