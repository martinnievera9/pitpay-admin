import styled from 'styled-components';

export const Wrapper = styled.div.attrs((props) => ({
  style: props.inlineStyle,
}))`
  font-size: 16px;
  line-height: 1.3em;
  position: relative;
  border: none;
  box-sizing: border-box;
  width: 100%;
`;

export const DownArrowIcon = styled.div`
  position: absolute;
  height: 20px;
  top: 0;
  bottom: 0;
  margin: auto;
  right: 12px;
  z-index: 0;
  cursor: default;
`;

export const InputLabel = styled.label.attrs((props) => ({
  style: props.inlineStyle,
}))`
  color: black;
  font-weight: 500;
  margin-bottom: 6px;
  font-size: 16px;
  display: block;
`;

const renderUnderline = (underlined) => {
  if (underlined) {
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
    padding: 0.94em 0.8em;
    `;
};

export const SelectInput = styled.select.attrs((props) => ({
  style: props.inlineStyle,
}))`
  outline: 0;
  line-height: normal;
  border-color: ${(props) =>
    props.error ? props.theme.colors.error : '#DCDCDC'};
  border-style: solid;
  ${(props) => renderUnderline(props.underlined)};
  ${(props) => (props.variant === 'minimal' ? 'border: none;' : '')}
  ${(props) => (props.variant === 'minimal' ? 'padding: 0 0.5em 0 0;' : '')}
  box-sizing: border-box;
  background: white;
  word-break: normal;
  overflow-wrap: break-word;
  word-wrap: break-word;
  appearance: none;
  font-size: ${(props) => props.fontSize || 16}px;
  font-weight: ${(props) => props.fontWeight || 400};
  width: 100%;
  z-index: 2;
  margin: 0;
  color: ${(props) => props.theme.colors.secondary};
  min-height: ${(props) => (props.as === 'textarea' ? '120px' : 'auto')}
    '&::placeholder:' {
    color: ${(props) => (props.error ? props.theme.colors.error : '#727279')};
  }

  &:focus {
    box-shadow: 0 0 0 0 ${(props) => props.theme.colors.secondary}BF;
  }
`;
