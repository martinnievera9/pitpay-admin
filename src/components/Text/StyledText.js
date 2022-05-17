import styled, { css } from 'styled-components';

const sizeStyle = props => {
  const type = props.type || 'body4';
  const fontType = typeof type === 'string' ? props.theme.fonts[type] : null;
  const color = props.theme.colors.text[props.colorProp]
    ? props.theme.colors.text[props.colorProp]
    : props.colorProp;

  if (fontType) {
    return css`
      color: ${color};
      font-size: ${fontType.fontSize}px;
      line-height: ${fontType.lineHeight}px;
      font-weight: ${fontType.fontWeight};
      font-family: ${fontType.fontFamily ? fontType.fontFamily : 'Roboto'};
      ${fontType.textTransform
        ? `text-transform: ${fontType.textTransform}`
        : ''};
      ${fontType.letterSpacing
        ? `letter-spacing: ${fontType.letterSpacing}`
        : ''};
    `;
  }

  return css`
    color: ${color};
    font-size: ${props.fontSize || props.theme.fonts.default.fontSize}px;
    line-height: ${props.lineHeight || props.theme.fonts.default.lineHeight}px;
    font-weight: ${props.fontWeight || props.theme.fonts.default.fontWeight};
  `;
};

const textAlignStyle = css`
  text-align: ${props => props.textAlign};
`;

const fontSizeStyle = css`
  font-size: ${props => props.fontSize}px;
`;

const fontWeightStyle = css`
  font-weight: ${props => props.fontWeight};
`;

const lineHeightStyle = css`
  line-height: ${props => props.lineHeight}px;
`;

const truncateStyle = `
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

// const colorStyle = css`
//   color: ${props =>
//     props.colorProp ? props.colorProp : props.theme.colors.black};
// `;

const weightStyle = css`
  font-weight: ${props => props.weight};
`;

export const StyledText = styled.div.attrs(props => ({
  style: props.inlineStyle
}))`
  display: inline;

&:hover{
  ${props => (props.hoverColor ? `color: ${props.hoverColor};` : '')}
}


${props => sizeStyle(props)}
${props => props.textAlign && textAlignStyle}
${props => props.fontSize && fontSizeStyle}
${props => props.fontWeight && fontWeightStyle}
${props => props.lineHeight && lineHeightStyle}
${props => props.truncate && truncateStyle}
${'' /* ${props => props.colorProp && colorStyle} */}
${props => props.weight && weightStyle}
${props => props.theme.text && props.theme.text.extend}

& > strong {
  font-weight: 600!important;
}

`;
