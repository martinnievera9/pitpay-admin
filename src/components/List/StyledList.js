import styled from "styled-components";
import { Field } from "formik";

export const Wrapper = styled.div.attrs(props => ({
  style: props.inlineStyle
}))`
  font-size: 14px;
  line-height: 1.3em;
  position: relative;
  border: none;
  box-sizing: border-box;
  width: 100%;
`;

export const InputLabel = styled.label.attrs(props => ({
  style: props.inlineStyle
}))`
  color: black;
  font-weight: 500;
  margin-bottom: 6px;
  font-size: 16px;
  display: block;
`;

const renderUnderline = props => {
  if (props.underlined) {
    return `
    border-top-width: 0;
    border-left-width: 0;
    border-right-width: 0;
    border-bottom-width: 1px;
    padding: 0 0 16px 0;
    `;
  }

  return `
    border-width: 1px;
    border-radius: 5px;
    padding: ${props.icon ? "0.94em 0.8em 0.94em 3.0em" : "0.94em 0.8em"};
    `;
};

export const ErrorText = styled.div`
  margin-top: 5px;
  font-size: ${props => props.fontSize || 14}px;
  color: ${props => props.theme.colors.error};
`;

export const InputText = styled(Field).attrs(props => ({
  style: props.inlineStyle
}))`
  outline: 0;
  line-height: normal;
  border-color: ${props =>
    props.error ? props.theme.colors.error : "#DCDCDC"};
  border-style: solid;
  ${props => renderUnderline(props)}
  box-sizing: border-box;
  background: white;
  word-break: normal;
  overflow-wrap: break-word;
  word-wrap: break-word;
  appearance: none;
  font-size: ${props => props.fontSize || 14}px;
  font-weight: ${props => props.fontWeight || 400};
  width: 100%;
  z-index: 2;
  margin: 0;
  color: ${props => props.theme.colors.secondary};
  min-height: ${props => (props.as === "textarea" ? "120px" : "auto")}

  &::placeholder {
    color: ${props => (props.error ? props.theme.colors.error : "#727279")};
  }

  &:focus {
    box-shadow: 0 0 0 0 ${props => props.theme.colors.secondary}BF;
  }
`;
