import styled from 'styled-components';

export const Wrapper = styled.div.attrs((props) => ({
  style: props.inlineStyle,
}))`
  font-size: 14px;
  line-height: 1.3em;
  position: relative;
  border: none;
  box-sizing: border-box;
  width: 100%;
`;

const renderUnderline = (props) => {
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
    padding: ${props.icon ? '0.94em 0.8em 0.94em 3.0em' : '0.94em 0.8em'};
    `;
};

export const InputText = styled.input.attrs((props) => ({
  style: props.inputStyle,
}))`
  outline: 0;
  line-height: normal;
  border-color: ${(props) =>
    props.error ? props.theme.colors.error : '#DCDCDC'};
  border-style: solid;
  ${(props) => renderUnderline(props)}
  box-sizing: border-box;
  background: white;
  word-break: normal;
  overflow-wrap: break-word;
  word-wrap: break-word;
  appearance: none;
  font-size: ${(props) => props.fontSize || 14}px;
  font-weight: ${(props) => props.fontWeight || 400};
  width: 100%;
  z-index: 2;
  margin: 0;
  color: ${(props) => props.theme.colors.secondary};
  min-height: ${(props) => (props.as === 'textarea' ? '120px' : 'auto')};
  font-family: Roboto;

  &:placeholder {
    color: ${(props) => (props.error ? props.theme.colors.error : '#727279')};
  }

  &:focus {
    box-shadow: 0 0 0 0 ${(props) => props.theme.colors.secondary}BF;
  }
`;

export const IconContainer = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto;
  left: 14px;
  height: 20px;
`;
