import styled from 'styled-components';

export const ErrorText = styled.div`
  margin-top: 5px;
  font-size: 14px;
  color: ${(props) => props.theme.colors.error};
  float: left;
`;

export const Description = styled.p`
  font-size: 12px;
  line-height: ${(props) => props.theme.fonts.default.lineHeight}px;
  margin-top: 8px;
`;

export const LabelWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

export const Label = styled.label.attrs((props) => ({
  style: props.inlineStyle,
}))`
  color: black;
  font-weight: 500;
  margin-bottom: 6px;
  font-size: 4.2vw;
  display: block;

  @media (min-width: 700px) {
    font-size: 16px;
  }
`;
