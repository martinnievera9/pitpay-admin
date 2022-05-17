import styled from 'styled-components';

export const Wrapper = styled.div`
  height: auto;
  width: 100%;
  box-sizing: border-box;
`;

export const ItemWrapper = styled.div`
  margin-bottom: 20px;
`;

export const Item = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  margin-bottom: 10px;
`;

export const LabelRow = styled.label`
  display: flex;
  flex: 1;
  align-items: center;
`;

export const RadioButtonLabel = styled.label`
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto;
  left: 4px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: white;
  border: 1px solid #dcdcdc;
  font-size: 14px;
`;
export const RadioButton = styled.input`
  opacity: 0;
  z-index: 1;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  margin-right: 10px;
  &:hover ~ ${RadioButtonLabel} {
    ${'' /* background: #dcdcdc; */}
    &::after {
      content: '';
      display: block;
      border-radius: 50%;
      width: 6px;
      height: 6px;
      margin: 6px;
      background: #eeeeee;
    }
  }
  &:checked + ${RadioButtonLabel} {
    background: ${(props) => props.theme.colors.primary};
    border: 1px solid ${(props) => props.theme.colors.primary};
    &::after {
      content: '';
      display: block;
      border-radius: 50%;
      width: 6px;
      height: 6px;
      margin: 6px;
      box-shadow: 1px 3px 3px 1px rgba(0, 0, 0, 0.1);
      background: white;
    }
  }
`;

export const LabelText = styled.div`
  color: ${(props) => props.theme.colors.text.black};
  font-size: 16px;
  padding-left: 5px;

  @media (min-width: 500px) {
    font-size: 17px;
  }
`;
