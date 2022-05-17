import styled from 'styled-components';

export const Container = styled.div`
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
`;

export const ModalContainer = styled.div`
  width: 95%;
  max-width: 600px;
  background-color: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 5px;
  border: 1px solid #e6e6e6;
  box-sizing: border-box;
  max-height: 90vh;
  margin-top: 20px;
  ${props => (props.overflow ? 'overflow: auto' : '')};

  @media (min-width: 768ox) {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

export const Wrapper = styled.div`
  padding: 20px;

  @media (min-width: 768px) {
    padding: 40px;
  }
`;

export const Heading = styled.span`
  font-family: Barlow Condensed;
  font-weight: 600;
  font-size: 24px;
  color: #00001f;
  display: block;
  padding: 0 10px;

  @media (min-width: 768px) {
    font-size: 28px;
  }
`;

export const Label = styled.span`
  font-family: Roboto;
  font-size: 15px;
  font-weight: 600;
  color: #00001f;
  display: block;
  margin-bottom: 10px;
`;

export const Section = styled.div`
  margin-bottom: 20px;
`;

export const OptionsWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

export const Option = styled.span`
  &:first-child {
    a {
      padding-left: 0;
    }
  }
  a {
    font-family: Roboto;
    font-size: 14px;
    font-weight: 600;
    color: #00001f;
    text-decoration: none;
    display: flex;
    padding-left: 25px;
    align-items: center;

    @media (min-width: 768px) {
      font-weight: 500;
      font-size: 20px;
    }

    &:before {
      content: '';
      display: block;
      width: 20px;
      height: 20px;
      margin-right: 5px;
      border: 1px solid #dcdcdc;
    }
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  a {
    text-decoration: none;
  }
`;

export const Or = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
  text-align: center;
  position: relative;
  font-weight: bold;
  font-size: 15px;
  text-transform: uppercase;

  &:before {
    content: '';
    width: 40%;
    height: 1px;
    background-color: #e6e6e6;
    position: absolute;
    left: 0;
    top: 50%;
  }

  &:after {
    content: '';
    width: 40%;
    height: 1px;
    background-color: #e6e6e6;
    position: absolute;
    right: 0;
    top: 50%;
  }
`;

export const TicketsWrapper = styled.div`
  display: flex;
  margin-top: 20px;
`;
