import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

const sizeStyle = props => {
  const type = props.type || "body4";
  const fontType = typeof type === "string" ? props.theme.fonts[type] : null;

  if (fontType) {
    return css`
      font-size: ${fontType.fontSize};
      line-height: ${fontType.lineHeight};
      font-weight: ${fontType.fontWeight};
      ${fontType.textTransform
        ? `text-transform: ${fontType.textTransform}`
        : ""};
      ${fontType.letterSpacing
        ? `letter-spacing: ${fontType.letterSpacing}`
        : ""};
    `;
  }

  return css`
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

const lineHeightStyle = css`
  line-height: ${props => props.lineHeight}px;
`;

const truncateStyle = `
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const colorStyle = css`
  color: ${props =>
    props.colorProp ? props.colorProp : props.theme.colors.primary};
`;

const weightStyle = css`
  font-weight: ${props => props.weight};
`;

export const StyledAnchor = styled(Link).attrs(props => ({
  style: props.inlineStyle
}))`
  display: block;
  color: ${props => props.theme.colors.primary};

  &:hover{
    ${props => (props.hoverColor ? `color: ${props.hoverColor};` : "")}
  }

  text-decoration: none;

  ${props => sizeStyle(props)}
  ${props => props.textAlign && textAlignStyle}
  ${props => props.fontSize && fontSizeStyle}
  ${props => props.lineHeight && lineHeightStyle}
  ${props => props.truncate && truncateStyle}
  ${props => props.colorProp && colorStyle}
  ${props => props.weight && weightStyle}
  ${props => props.theme.text && props.theme.text.extend}
`;
